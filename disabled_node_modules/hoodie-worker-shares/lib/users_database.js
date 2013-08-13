var UserDatabase = require('./user_database.js');

/**
 *  UsersDatabase
 *
 *  this worker wraps the _users database and listens
 *  to its changes. For shares, we listen to newly 
 *  created (and confirmed) user accounts to create
 *  the user shares databases and init the respective
 *  listeners.
 *
 */
var UsersDatabase = function(worker) {
  this.name     = '_users';
  this.worker   = worker;
  this.couch    = worker.couch;
  this.database = worker.couch.database(this.name);
  this.hoodie   = worker.hoodie;

  this.userDatabases = {};

  this.listenUp();
};


// 
// 
// 
UsersDatabase.prototype.listenUp = function() {
  var that = this;
  var q = {include_docs: true};
  this.hoodie.couch.changes(this.name, q, function (err, change) {
    if (err) {
      return that.handleChangeError(err);
    }
    return that.handleChange(change);
  });

  // worker events
  this.worker.on("account:removed", this.handleRemovedUserAccount.bind(this) );
  this.worker.on("account:added", this.handleCreatedUserAccount.bind(this) );
};


// 
// handler for changes from the _users/changes feed.
// We start new UserDbWorkers for every new confirmed user account
// 
UsersDatabase.prototype.handleChange = function(change)
{ 
  var eventName;

  this.log('_changes update: /%s/%s?rev=%s', this.name, change.id, change.doc._rev);

  // this filters out things like password resets, that also create
  // new docs in _users database, as it is the only datbase that
  // can work as a secure drop box in CouchDB land.
  if (! change.doc.database)
    return;

  // we wait until an account has been confirmed before we create
  // the user shares database. That also filters out removed user
  // accounts that have not been confirmed yet.
  if (change.doc.$state !== 'confirmed')
    return;

  // just a convinience check to ignore valid accounts that have been
  // deleted but we did not initialize yet
  if (change.deleted && ! this.userDbInitialized(change.doc.database)) 
    return;

  // differentiate between `added`, `updated`, `removed` events
  if (change.deleted) {
    eventName = 'removed';
  } else {
    eventName = this.userDbInitialized(change.doc.database) ? 'updated' : 'added';
  }
  this.worker.emit( "account:" + eventName, change.doc.database );
};


// 
// handler for errors occuring in _users/changes listener.
// Shouldn't happen at all.
// 
UsersDatabase.prototype.handleChangeError = function( error ) {
  this.worker.handleError( error, 'error in _users/_changes feed' );
};


// 
// 
// 
UsersDatabase.prototype.userDbInitialized = function( dbName ) {
  return !!this.userDatabases[dbName];
};


// 
// 
// 
UsersDatabase.prototype.handleCreatedUserAccount = function( dbName ) {
  this.userDatabases[dbName] = new UserDatabase(dbName, this);
};

// 
// 
// 
UsersDatabase.prototype.handleRemovedUserAccount = function( dbName ) {
  delete this.userDatabases[dbName];
};


// 
// 
// 
UsersDatabase.prototype.log = function(message) {
  message = "[" + this.name + "]\t" + message
  this.worker.log.apply( this.worker, arguments);
};

module.exports = UsersDatabase;
