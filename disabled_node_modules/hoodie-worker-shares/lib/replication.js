/**
 *  Replication
 *  creates, updates and removes objects in _replicator database
 */
Replication = function( replicationObject, sharesDatabase ) {

  this.id         = replicationObject._id;
  this.name       = replicationObject._id.substr(14);
  this.properties = replicationObject;


  this.sharesDatabase = sharesDatabase;
  this.worker         = sharesDatabase.worker;
  this.couch          = sharesDatabase.couch;
  this.database       = sharesDatabase.couch.database('_replicator');

  this.start();
};


// 
// 
// 
Replication.prototype.start = function() {
  this.log("starting …")
  this.database.update("shares/start", this.id, function(error) {
    this.log("could not start %s: %j", this.name, error)
  }.bind(this))
};


// 
// 
// 
Replication.prototype.stop = function() {
  this.log("stopping …")
  this.database.update("shares/stop", this.id, function(error) {
    this.log("could not stop %s: %j", this.name, error)
  }.bind(this));
};


// 
// 
// 
Replication.prototype.log = function(message) {
  message = "[" + this.name + "]\t" + message
  this.worker.log.apply( this.worker, arguments)
}


module.exports = Replication;