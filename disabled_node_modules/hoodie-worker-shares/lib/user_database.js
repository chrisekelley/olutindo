var util         = require('util');
var EventEmitter = require('events').EventEmitter;
var helpers      = require('./helpers.js')

/**
 *  UserDatabase
 *
 *  wraps user's databases (user/<hash>) 
 *  and reacts on the respective changes
 *
 */
var UserDatabase = function(databaseName, usersDatabase) {

  this.hoodie             = usersDatabase.hoodie;
  this.name               = databaseName;
  this.ownerHash          = databaseName.match(/^([^\/]+)\/([^\/]+)/).pop();

  this.hoodie             = usersDatabase.worker.hoodie;
  this.worker             = usersDatabase.worker;
  this.couch              = usersDatabase.worker.couch;
  this.database           = usersDatabase.worker.couch.database(this.name);

  // map of users shares
  this.shares = {}
  
  this.log('listening on %s …', databaseName)
  this.listenUp()
};
util.inherits(UserDatabase, EventEmitter);


// 
// 
// 
UserDatabase.prototype.listenUp = function() {
  var that = this;
  var q = {include_docs: true};
  this.hoodie.couch.changes(this.name, q, function (err, change) {
    if (err) {
      return that.handleChangeError(err);
    }
    return that.handleChange(change);
  });

  this.on('object:unshared', this.handleObjectUnshare.bind(this) )
}


// 
// handler for changes in the userDb
// The two kind of objects are
// 
// 1. $share objects (these reperesant actual shares)
// 2. shared objects (these belong to one or multiple shares)
// 
UserDatabase.prototype.handleChange = function(change) {
  var doc = change.doc;

  this.log('_changes update: /%s/%s?rev=%s', this.name, change.id, change.doc._rev);


  if ( this.docIsShareObject(doc) ) {
    this.worker.emit('share:change', doc, this.name)
    return;
  }

  // ignore doc updates that have not been updated by me.
  if ( this.docIsShared(doc) && this.docChangedByMe(doc)) {
    this.handleSharedObjectChange(doc)
  }
}


// 
// handle updates to shared objects.
// 
// NOTE: a share object can be pushed together with its
//       shared objects. That can lead to cases when the
//       shared objects get handled before the actual share
// 
UserDatabase.prototype.handleSharedObjectChange = function(doc) {
  var shareId, filter;

  console.log("")
  this.log('handleSharedObjectChange: %j', doc)

  if ( doc.$unshared === true ) {
    this.handleObjectUnshare(doc)
    this.log('triggering object:unshared for %s', shareId)
  } 
  console.log("")
}


//
// handle errors occuring when listening to userDb's changes feed.
// A special event we look for is when a database has been dropped
// 
UserDatabase.prototype.handleChangeError = function(error) {
  if (error && error.message.indexOf("Database deleted after change") !== -1) {
    this.log("%s/_changes feed stopped after %s has been dropped", this.name);
    
    return;
  }
  
  this.log("error in %s/_changes: %j", this.name, error);
}


// 
// to unshare an already shared object, an `$unshared = true` 
// gets added in the frontend and then synced to the user's
// database. Here, the object gets removed in the 
// share and both `$unshared`  and `$sharedAt` get removed 
// from the object and updated in user's database. That gets 
// synced back again to the frontend. The app can listen to
// that change and let the user know that the object has been 
// unshared successfully.
// 
UserDatabase.prototype.handleObjectUnshare = function(object) {
  var shareId = object.$sharedAt;

  var updateObject        = this.worker.promisify( this.database, 'save' );
  var updateObjectInShare = this.worker.promisify( "share/#{shareId}", 'save' );

  // update in user's db
  delete object.$sharedAt;
  delete object.$unshared;
  updateObject(object._id, object._rev, object)
  .otherwise( this.worker.handleErrorWithMessage("handleObjectUnshare: Could not update %s/%s?rev=%s", this.name, object._id, object._rev) )

  // update object in share
  object._deleted  = true
  object.$unshared = true // added as reason why object has been deleted
  updateObjectInShare(object._id, object._rev, object)
  .otherwise( this.worker.handleErrorWithMessage("handleObjectUnshare: Could not update %s/%s?rev=%s", "share/#{shareId}", object._id, object._rev) )
}


// 
// 
// 
UserDatabase.prototype.updateObject = function( userObject ) {
  options = {
    method : 'PUT', 
    path   : encodeURIComponent(userObject._id) + "?new_edits=false", 
    body   : userObject
  }
  this.database.query(options, function(error) {
    if (error) {
      this.worker.handleError(error, "updateObject: could not update %s/%s (%j)", this.name, userObject._id, userObject)
      return;
    } 

    this.log("updated %s/%s ", this.name, userObject._id)
  }.bind(this));
}


// 
// helpers
// 
UserDatabase.prototype.docIsShareObject = function(doc) {
  return doc.type === "$share";
}
UserDatabase.prototype.docIsShared = function(doc) {
  return !! doc.$sharedAt;
}
UserDatabase.prototype.docChangedByMe = function(doc) {
  return doc.updatedBy !== this.ownerHash
}


// 
// 
// 
UserDatabase.prototype.log = function(message) {
  message = "[" + this.name + "]\t" + message
  this.worker.log.apply( this.worker, arguments)
}

module.exports = UserDatabase;
