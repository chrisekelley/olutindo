var util         = require('util');
var EventEmitter = require('events').EventEmitter;

var ShareDatabase = require('./share_database.js');
var Replication   = require('./replication.js');

/**
 *  SharesDatabase
 *
 *  maintains a special database "shares" which contains
 *  objects representing the share databases and their
 *  access settings as well as subscriptions to and from
 *  these shares to user accounts.
 *
 *  On on side it keeps the objects in "shares" up to date,
 *  on the other side it listens to its changes and reacts
 *  on it.
 *  
 *  For example, instead of creating 
 *  a share database directly, it firsts creates the
 *  respictive object in "shares". From the _changes 
 *  feed it sees the newly created share and then creates
 *  the actual share database. That allows us to control
 *  shares from the outside by making changes in "shares"
 *  database
 *
 */
var SharesDatabase = function(worker) {
  this.database_name = 'shares';
  this.name     = 'shares';
  this.worker   = worker;
  this.couch    = worker.couch;
  this.database = worker.couch.database(this.database_name)
  this.hoodie   = worker.hoodie;

  this.bootstrap()
  .then( this.listenUp.bind(this) )
  .otherwise( this.worker.handleErrorWithMessage("bootstrap failed.") )
};
util.inherits(SharesDatabase, EventEmitter);


// 
// load all existing shares and keep them
// as reference in memory. Once bootstrap
// is ready, start to listen to changes.
// 
SharesDatabase.prototype.bootstrap = function() {
  this.log("bootstrapping shares …")

  // stores for share & subscription objects as they
  // are stored in shares database
  this.shares = {};
  this.subscriptions = {};

  // references for actual share databases
  // and _replicator docs
  this.shareDatabases = {};
  this.replications = {};

  // load all existing objects with the _changes API
  // so that we get th last seq number with the same 
  // requset.
  var options = {
    method : 'GET', 
    path   : "_changes?include_docs=true"
  }
  var query = this.worker.promisify( this.database, 'query')

  return query(options).then(
    this.handleBootstrapSuccess.bind(this),
    this.handleBootstrapError.bind(this)
  )
}


// 
// note: cradle does not return the actual response
//       of CouchDB, for what ever reason …
//       Instead, it turns { results: […], last_seq: 1}
//       into an array with last_seq property
// 
SharesDatabase.prototype.handleBootstrapSuccess = function (results) {
  var lastSeq = results.last_seq,
      object,
      id;

  if (! results) {
    return this.worker.when.resolve(lastSeq)
  }

  for (var i = 0; i < results.length; i++) {

    if (results[i].deleted) {
      continue
    }

    object = results[i].doc

    // handle shares
    if ( this.isShareObject(object) ) {
      id = this.getShareId( object )
      this.shares[ id ] = object
      this.log("new shareDatabase: %s", id)
      this.shareDatabases[ id ] = new ShareDatabase(object, this)
    }

    // handle subscriptions
    if ( this.isSubscriptionObject(object) ) {
      id = this.getSubscriptionId( object )
      this.subscriptions[ id ] = object
      this.replications[ id ]  = new Replication(object, this)
    }
  }

  this.log("/shares bootstrapped")
  this.log("shares: %j", this.shares)
  this.log("subscriptions: %j", this.subscriptions)

  return this.worker.when.resolve(lastSeq)
}


// 
// 
// 
SharesDatabase.prototype.handleBootstrapError = function (error) {
  this.worker.handleError(error, "could not bootstrap shares")
}


// 
// 
// 
SharesDatabase.prototype.listenUp = function( last_seq ) {
  var q = {
    since: last_seq,
    include_docs: true
  };
  var that = this;
  this.hoodie.couch.changes(this.database_name, q, function (err, change) {
      if (err) {
          return that.handleChangeError(err);
      }
      else {
          return that.handleChange(change);
      }
  });

  this.worker.on('account:removed', this.handleAccountRemoved.bind(this))

  // global `share:change` events get triggered
  // in UserDatabase instances, when a share object
  // pops up in a user/<hash>/_changes feed
  this.worker.on('share:change', this.handleGlobalShareObjectChange.bind(this))

  // new share / subscription coming in from user database
  this.on('share:add',    this.addShareObject.bind(this) )
  this.on('share:update', this.updateShareObject.bind(this) )
  this.on('share:remove', this.removeShareObject.bind(this) )
  this.on('share:add',    this.addSubscriptionObject.bind(this) )
  this.on('share:remove', this.removeSubscriptionObject.bind(this) )

  this.emit('ready')
}


// 
// 
// 
SharesDatabase.prototype.handleChange = function( change ) {

  this.log('_changes update: /%s/%s?rev=%s', this.name, change.id, change.doc._rev);

  if ( this.isShareObject( change.doc) ) {
    this.handleShareObjectChange( change )
    return
  }

  if ( this.isSubscriptionObject( change.doc) ) {
    this.handleSubscriptionObjectChange( change )
    return
  }
}


// 
// 
// 
SharesDatabase.prototype.handleShareObjectChange = function( change ) 
{
  var eventName;

  if ( change.deleted ) {
    this.handleShareObjectRemove( change.doc )
    return
  }

  if ( ! this.shareDatabaseExists( change.doc )) {
    this.handleShareObjectAdd( change.doc )
  } else {
    this.handleShareObjectUpdate( change.doc )
  }
}


// 
// 
// 
SharesDatabase.prototype.handleSubscriptionObjectChange = function( change )
{
  var eventName;

  if ( change.deleted ) {
    this.handleSubscriptionObjectRemove( change.doc )
    return
  }

  if ( ! this.replicationExists( change.doc )) {
    this.handleSubscriptionObjectAdd( change.doc )
  } else {
    this.handleSubscriptionObjectUpdate( change.doc )
  }
}


// 
// handles changes occuring in shares/_changes feed. 
// Should not happen really.
// 
SharesDatabase.prototype.handleChangeError = function( error ) {
  this.worker.handleError( error, 'error in shares/_changes feed' );
}


// 
// truns a global share:change event triggered by a
// UserDatabase instance (`user/<hash>/_changes`) 
// into a local share events:
// 
// 1. `share:add` when a new share has been created
// 2. `share:update` when an existing share has been update
// 3. `share:remove` when an existing share has been removed
// 4. `share:error:<userHash>` when something goes wrong
// 
SharesDatabase.prototype.handleGlobalShareObjectChange = function( shareObject, originDatabaseName ) {

  this.log("handleGlobalShareObjectChange in %s,\n%j", originDatabaseName, shareObject)

  var shareId = this.getShareId(shareObject); // $share/123 => 123

  // when a share gets deleted that does not exist in shares,
  // ignore it. That might happen after a server restart,
  // as changes from user & user shares databases 
  // get retriggered
  if (shareObject._deleted && ! this.shares[shareId]) {
    return
  }

  if (! this.shareExists( shareObject ) ) {
    this.emit('share:add', shareObject, originDatabaseName)
    return
  }

  // prevent others from hijacking shares
  if ( this.shareCreatedBy(shareObject, originDatabaseName) &&
     ! this.shareBelongsTo(shareObject, originDatabaseName) ) {

    this.log('share:error:%s: This share belongs to another user', originDatabaseName)
    this.worker.emit( 'share:error:' + originDatabaseName, "This share belongs to another user")
    return
  }

  // when a share gets deleted, remove its database, replications and objects
  if (shareObject._deleted && this.shares[shareId]) {
    this.emit('share:remove', shareObject, originDatabaseName)
  } else {
    this.emit('share:update', shareObject, originDatabaseName)
  }
}


// 
// 
// 
SharesDatabase.prototype.handleAccountRemoved = function( originDatabaseName ) {
  var ownerHash = originDatabaseName.split(/\//).pop()
  
  this.findAllObjectsBelongingTo( ownerHash )
  .then( this.removeObjects.bind(this) )
  .otherwise( this.worker.handleErrorWithMessage("could not cleanup objects after account: %s removed", ownerHash) )
}


// 
// 
// 
SharesDatabase.prototype.findAllObjectsBelongingTo = function( ownerHash ) {
  var share, subscription, objects = [];

  // find shares
  for( var shareId in this.shares ) {
    share = this.shares[shareId];
    if ( this.shareBelongsTo(share, ownerHash) ) {
      objects.push( share );
    }
  }

  // find subscriptions

  for( var subscriptionId in this.subscriptions ) {
    subscription = this.subscriptions[subscriptionId];
    if ( this.subscriptionBelongsTo(subscription, ownerHash) ) {
      objects.push( subscription );
    }
  }

  return this.worker.when.resolve( objects )
}


// 
// 
// 
SharesDatabase.prototype.removeObjects = function( objects ) {
  var save = this.worker.promisify( this.database, 'save' )

  for (var i = 0; i < objects.length; i++) {
    objects[i]._deleted = true;
  }

  return save(objects)
}



// 
// 
// 
SharesDatabase.prototype.addShareObject = function(shareObject, originDatabaseName) {
  var error, message
  var save = this.worker.promisify( this.database, 'save' )
  var shareId = this.getShareId(shareObject);
  var originOwnerHash = originDatabaseName.split(/\//).pop()

  // … unless this share is not mine. That should not happen, really
  if (shareObject.createdBy !== originOwnerHash) {
    error = { error: 'invalid_share', reason: "" + shareId + " does not belong to " + originDatabaseName }
    message = "" + shareId + " cannot be created"
    this.worker.handleError(error, message)
    this.worker.emit( 'share:error:' + originDatabaseName, "Share cannot be created, it belongs to another user")
    return
  }

  this.shares[shareId] = shareObject;
  return save( shareObject )
  .then( this.handleUpdateShareObjectSuccess.bind(this) )
  .otherwise( this.worker.handleErrorWithMessage('could not add shares/%s', shareObject._id) )
};


// 
// 
// 
SharesDatabase.prototype.updateShareObject = function(userShareObject, originDatabaseName) {
  var save = this.worker.promisify( this.database, 'save' )
  var shareId = this.getShareId(userShareObject)
  var shareObject = this.shares[shareId]
  var rev = shareObject._rev

  this.log("updateShareObject 1")

  if ( ! this.shareBelongsTo(userShareObject, originDatabaseName)) {
    return
  }

  this.log("updateShareObject 2")

  // ignore if we already got the latest version.
  // NOTE: That might come from a server restart. The objects from the user
  //       databases do get reloaded and respective events might get retriggered.
  if ( this.shares[shareId].updatedAt === userShareObject.updatedAt ) {
    return
  }

  this.log("updateShareObject 3")

  this.shares[shareId] = userShareObject
  
  // keep our rev number to avoid conflicts
  this.shares[shareId]._rev = rev

  return save( userShareObject )
  .then( this.handleUpdateShareObjectSuccess.bind(this) )
  .otherwise( this.worker.handleErrorWithMessage('could not update shares/%s', shareObject._id) )
};


// 
// response from PUT, looks like
// {"ok":true,"id":"$share/k8fgrcz","rev":"3-33a15e025f24c5b15a2d494a1c3d3d4e"}
// 
SharesDatabase.prototype.handleUpdateShareObjectSuccess = function(response) {
  if (typeof response.id === 'undefined') {
    console.log("STRANGE RESPONSE for SharesDatabase#handleUpdateShareObjectSuccess")
    console.log(response)
    return
  }
  var shareId = this.getShareId({_id: response.id})
  this.shares[shareId]._rev = response.rev
}


// 
// remove share object from shares database,
// but only if share belongs to origin
// 
SharesDatabase.prototype.removeShareObject = function(userShareObject, originDatabaseName) {
  var shareId     = this.getShareId(userShareObject)
  var shareObject = this.shares[shareId]
  // get our 
  

  if ( ! this.shareBelongsTo(shareObject, originDatabaseName)) {
    return
  }

  var updateObject = this.worker.promisify( this.database, 'save')

  shareObject._deleted = true
  updateObject( shareObject )
  .otherwise( this.worker.handleErrorWithMessage("could not remove shares/%s?rev=%s", shareObject._id, shareObject._rev).bind(this) )
};


// 
// 
// 
SharesDatabase.prototype.addSubscriptionObject = function(shareObject, originDatabaseName) {
  var save = this.worker.promisify( this.database, 'save' )

  var shareDatabaseName = shareObject._id.substr(1);
  var ownerHash = originDatabaseName.split(/\//).pop()
  var subscriptionId
  var subscriptionObject = {}

  // 1. If share belongs to originDatabase
  //    a) add a push replication from originDatabase to the share
  //    b) if share has write access, add pull replication
  // 2. If share does not belong to originDatabase
  //    a) add pull replication
  //    b) origin has write access, add push replication
  // 
  // … but for now, fuck that, shares are read only atm.

  if ( this.shareBelongsTo(shareObject, originDatabaseName) ) {
    subscriptionObject.source = originDatabaseName
    subscriptionObject.target = shareDatabaseName
  } else {
    subscriptionObject.source = originDatabaseName
    subscriptionObject.target = shareDatabaseName
  }

  subscriptionId = this.makeSubscriptionId(subscriptionObject.source, subscriptionObject.target)
  subscriptionObject._id = "$subscription/" + subscriptionId
  subscriptionObject.createdAt = new Date()
  subscriptionObject.updatedAt = new Date()
  subscriptionObject.createdBy = ownerHash

  this.subscriptions[subscriptionId] = subscriptionObject;
  save(subscriptionObject)
  .then( this.handleUpdateSubscriptionObjectSuccess.bind(this) )
  .otherwise( this.worker.handleErrorWithMessage("could not add shares/" + subscriptionObject._id) )
};

// 
// response from PUT, looks like
// {"ok":true,"id":"$share/k8fgrcz","rev":"3-33a15e025f24c5b15a2d494a1c3d3d4e"}
// 
SharesDatabase.prototype.handleUpdateSubscriptionObjectSuccess = function(response) {
  if (typeof response.id === 'undefined') {
    console.log("STRANGE RESPONSE for SharesDatabase#handleUpdateSubscriptionObjectSuccess")
    console.log(response)
    return
  }
  var subscriptionId = this.getSubscriptionId({_id: response.id})
  this.subscriptions[subscriptionId]._rev = response.rev
}


// 
// 
// 
SharesDatabase.prototype.removeSubscriptionObject = function(shareObject, originDatabaseName) {
  var shareDatabaseName = this.getShareDatabaseName(shareObject);
  var subscriptionId, subscriptionObject, save;

  if (this.shareBelongsTo(shareObject, originDatabaseName)) {
    subscriptionId = this.makeSubscriptionId(originDatabaseName, shareDatabaseName);
  } else {
    subscriptionId = this.makeSubscriptionId(shareDatabaseName, originDatabaseName);
  }
  
  subscriptionObject = this.subscriptions[subscriptionId];
  save = this.worker.promisify( this.database, 'save' );

  if (! subscriptionObject) {
    this.log("Tried to remove shares/%s, but it does not exist", subscriptionId);
    this.log("DEBUG: all subscriptions: %j", this.subscriptions)
    return
  }

  subscriptionObject._deleted = true;
  delete this.subscriptions[subscriptionId];
  
  save(subscriptionObject)
  .otherwise( this.worker.handleErrorWithMessage("could not remove shares/" + subscriptionObject._id) );
};





// 
// get share id for passed share object:
// "$share/123" => "123"
// 
SharesDatabase.prototype.getShareId = function(shareObject) {
  return shareObject._id.substr(7);
};


// 
// get subscription id for passed subscription object:
// "$subscription/source => target" => "source => target"
// 
SharesDatabase.prototype.getSubscriptionId = function(subscriptionObject) {
  return subscriptionObject._id.substr(14);  
};


// 
// returns true if passed object is a share object
// 
SharesDatabase.prototype.isShareObject = function(object) {
  return /^\$share\//.test(object._id);
};


// 
// returns true if passed object is a subscription object
// 
SharesDatabase.prototype.isSubscriptionObject = function(object) {
  return /^\$subscription\//.test(object._id);
};


// 
// get database name for passed share object,
// e.g. `share/123`
// 
SharesDatabase.prototype.getShareDatabaseName = function(shareObject) {
  return shareObject._id.substr(1);
};


// 
// returns a subscription id for the passed
// database names, e.g.:
// "database1 => database2"
// 
SharesDatabase.prototype.makeSubscriptionId = function(databaseName1, databaseName2) {
  return [databaseName1, databaseName2].join(' => ');
};


// 
// returns true if a share object exists for 
// the passed shareObject
// 
SharesDatabase.prototype.shareExists = function(shareObject) {
  var shareId = this.getShareId(shareObject);
  return !! this.shares[shareId];
};


// 
// returns true if a subscription object exists for 
// the passed shareObject
// 
SharesDatabase.prototype.subscriptionExists = function(shareObject, originDatabaseName) {
  var shareDatabaseName = this.getShareDatabaseName(shareObject)
  var subscriptionId = this.makeSubscriptionId(shareDatabaseName, originDatabaseName)
  return !! this.subscriptions[subscriptionId];
};


// 
// returns true if passed share object 
// has been created by owner hash, otherwise false
// 
SharesDatabase.prototype.shareCreatedBy = function(shareObject, databaseNameOrOwnerHash) {
  var ownerHash = databaseNameOrOwnerHash.split(/\//).pop()
  return shareObject.createdBy === ownerHash
};


// 
// returns true if passed share object 
// belongs  to passed owner hash, otherwise false
// 
SharesDatabase.prototype.shareBelongsTo = function(shareObject, databaseNameOrOwnerHash) {
  var ownerHash = databaseNameOrOwnerHash.split(/\//).pop()
  var shareId = this.getShareId(shareObject);
  return this.shares[shareId].createdBy === ownerHash
};


// 
// returns true if passed subscription object 
// belongs  to passed owner hash, otherwise false
// 
SharesDatabase.prototype.subscriptionBelongsTo = function(subscriptionObject, databaseNameOrOwnerHash) {
  var ownerHash = databaseNameOrOwnerHash.split(/\//).pop()
  var userDatabaseName = "user/"+ownerHash;
  return subscriptionObject.source === userDatabaseName || subscriptionObject.target === userDatabaseName;
};





// 
// returns true if a share database exists or not based
// on whether a ShareDatabase has been initialized for
// the passed share Object
// 
SharesDatabase.prototype.shareDatabaseExists = function( shareObject ) {
  var shareId = this.getShareId(shareObject);
  return !! this.shareDatabases[ shareId ]
}


// 
// returns true if a replication exists or not based
// on whether a Replication has been initialized for
// the passed Subscription Object
// 
SharesDatabase.prototype.replicationExists = function( subscriptionObject ) {
  var subscriptionId = this.getSubscriptionId( subscriptionObject );
  return !! this.shareDatabases[ subscriptionId ]
}


// 
// handle the event that a new $share/<id> object
// has been added to shares database
// 
SharesDatabase.prototype.handleShareObjectAdd = function( shareObject ) {
  var shareId = this.getShareId(shareObject);
  this.shareDatabases[ shareId ] = new ShareDatabase(shareObject, this)
}


// 
// handle the event that an existing $share/<id> object
// has been updated in the shares database
// 
SharesDatabase.prototype.handleShareObjectUpdate = function( shareObject ) {
  var shareId = this.getShareId(shareObject);
  this.shareDatabases[ shareId ].update(shareObject)
}


// 
// handle the event that an existing $share/<id> object
// has been removed from shares database
// 
SharesDatabase.prototype.handleShareObjectRemove = function( shareObject ) {
  var shareId = this.getShareId(shareObject);
  this.log("Dropping shareDatabase: %s", shareId)
  this.shareDatabases[ shareId ].drop();
  delete this.shareDatabases[ shareId ];
}


// 
// 
// 
SharesDatabase.prototype.handleSubscriptionObjectAdd = function( replicationObject ) {
  var replicationId = this.getSubscriptionId( replicationObject );
  this.replications[ replicationId ] = new Replication(replicationObject, this)
}


// 
// 
// 
SharesDatabase.prototype.handleSubscriptionObjectUpdate = function( replicationObject ) {
  // nothin' in here yet
}


// 
// 
// 
SharesDatabase.prototype.handleSubscriptionObjectRemove = function( replicationObject ) {
  var replicationId = this.getSubscriptionId( replicationObject );
  this.replications[ replicationId ].stop();
  delete this.replications[ replicationId ];
}



// 
// 
// 
SharesDatabase.prototype.log = function(message) {
  message = "[" + this.name + "]\t" + message
  this.worker.log.apply( this.worker, arguments)
}

module.exports = SharesDatabase;





// // 
// // just as `createShare`, only without creating the share db
// // or updating access settings
// //
// UserSharesDatabase.prototype.subscribeToShare = function(shareDatabaseName) {
//   this.log("subscribeToShare: " + shareDatabaseName)

//   var replication_to_share = this.name + " => " + shareDatabaseName,
//       replication_to_user = shareDatabaseName + " => " + this.name,
//       shareId = shareDatabaseName.split('/').pop();

//   this.couch.database('_replicator').update("shares/start", replication_to_share, {filter: 'filters/share' });
//   this.couch.database('_replicator').update("shares/start", replication_to_user);
// }

// // 
// // 
// // 
// UserSharesDatabase.prototype.dropShare = function(shareDatabaseName)
// {
//   this.log("dropShare: " + shareDatabaseName)

//   var replication_to_share = this.name + " => " + shareDatabaseName,
//       replication_to_user = shareDatabaseName + " => " + this.name;

//   this.log('stopping replication %s', replication_to_share)
//   this.log('stopping replication %s', replication_to_user)
//   this.couch.database('_replicator').update("shares/stop", replication_to_share);
//   this.couch.database('_replicator').update("shares/stop", replication_to_user);

//   // give it a time out so that replication docs can be dropped
//   // without being updated due to "target/source db does not exist"  errors
//   setTimeout( function() {
//     this.couch.database(shareDatabaseName).destroy();
//   }.bind(this), 3000)

//   this.database.all({
//     startkey: shareDatabaseName + "/",
//     endkey: shareDatabaseName + "0"
//   }, function(error, response) {
//     var docsToDelete = [];
//     if (error) {
//       this.log("Error loading objects belonging to %s. %j", this.name, error);
//       return;
//     }

//     // gather docs to be deleted
//     for (var sharedDoc, i = 0; i < response.rows.length; i++) {
//       sharedDoc = response.rows[i];
//       docsToDelete.push({
//         _id: sharedDoc._id,
//         _rev: sharedDoc._rev,
//         _deleted: true
//       });
//     }

//     // delete 'em all at once
//     this.database.save(docsToDelete);
//   }.bind(this)); 
// }

// // 
// // just as `createShare`, only without creating the share db
// // or updating access settings
// //
// UserSharesDatabase.prototype.unsubscribeFromShare = function(shareDatabaseName) {
//   this.log("unsubscribeFromShare: " + shareDatabaseName)

//   var replication_to_share = this.name + " => " + shareDatabaseName,
//       replication_to_user = shareDatabaseName + " => " + this.name;

//   this.couch.database('_replicator').update("shares/stop", replication_to_share);
//   this.couch.database('_replicator').update("shares/stop", replication_to_user);
// }
