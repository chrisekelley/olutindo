/**
 *  ShareDatabase
 *  creates, updates and removes share databases
 */
var ShareDatabase = function(shareObject, sharesDatabase) {
  this.id         = shareObject._id.substr(7);
  this.name       = "share/" + this.id
  this.properties = shareObject;

  this.sharesDatabase = sharesDatabase
  this.worker         = sharesDatabase.worker
  this.couch          = sharesDatabase.couch
  this.database       = sharesDatabase.couch.database(this.name)

  this.create()
}




// 
// 
// 
ShareDatabase.prototype.update = function( shareObject ) {
  
  var accessChanged = this.accessSettingsChanged( shareObject );

  this.properties = shareObject
  if (accessChanged) this.updateAccessSettings()
};


// 
// 
//
ShareDatabase.prototype.create = function() 
{ 
  var replicate = this.worker.promisify(this.couch, 'replicate')
  var options = {
    source        : "skeleton/share",
    target        : this.name,
    create_target : true
  }
  
  this.log("creating …")
  return replicate( options )
  .then( this.updateAccessSettings.bind(this) )
  .otherwise( this.handleCreateError.bind(this) )
}


// 
// 
//
ShareDatabase.prototype.handleCreateError = function(error) 
{ 
  this.log(error, "could not create database.")
}


// 
// Only the user is allowed to access his shares database
// 
ShareDatabase.prototype.updateAccessSettings = function() {
  this.log('updateAccessSettings for ' + this.name)

  var readAccess  = this.properties && this.properties.access && (this.properties.access.read || this.properties.access),
      writeAccess = this.properties && this.properties.access && this.properties.access.write;

  return this.worker.when.all([
    this.resolveAccess(readAccess), 
    this.resolveAccess(writeAccess)
  ])
  .then( this.sendSecurityUpdateRequest.bind(this) )
  .otherwise( this.handleUpdatAccessSettingsError.bind(this) )
}


// 
// 
// 
ShareDatabase.prototype.resolveAccess = function(accessSetting) {
  var view = this.worker.promisify( this.couch.database("_users"), 'view' )
  var ownerHash = this.properties.createdBy

  this.log('resolveAccess %j', accessSetting)

  if (accessSetting === true) {
    return this.worker.when.resolve([])
  }

  if (accessSetting === undefined || accessSetting === false) {
    return this.worker.when.resolve([ownerHash])
  }

  // when accessSetting is an array of user names, 
  // we first have to find the respective hashes
  return view('views/ownerByUsername', { keys: accessSetting})
  .then( function(results) {

    this.log("views/ownerByUsername: \n%j", results)
    this.log("accessSetting: \n%j", accessSetting)

    var list = [ownerHash];

    results.forEach( function(result) { 
      this.log("result: %j", result)
      if (typeof result == 'string') {
        list.push(result); 
      } else {
        list.push(result.value); 
      }
    }.bind(this));

    this.log("list: %j", list)

    return list
  }.bind(this) )
}


// 
// 
// 
ShareDatabase.prototype.sendSecurityUpdateRequest = function(values) {
  var members = values[0] || [],
      writers = values[1] || [];

  var query = this.worker.promisify( this.database, 'query' )
  var options = {
    path   : '_security',
    method : 'PUT',
    json   : {
      members: {
        roles: members
      },
      writers: {
        roles: writers
      }
    }
  };

  this.log("updating " + this.name + "/_security with: %j", options.json)
  return query(options)
}


// 
// 
// 
ShareDatabase.prototype.handleUpdatAccessSettingsError = function(error) {
  this.worker.handleError(error, "could not update _security settings")
}


// 
// we cannot drop the database immediately, this would lead
// to an error in related replications. So we need to remove
// the replications first, and then the database. Otherwise
// the new revisions due to the errors would lead to conflicts
// when we try to stop the respective replications and would
// in some cases keep the _replicator docs, which we don't want. 
// 
// So here's the workaround:
// First, we update _security, so nobody can access the share anymore.
// Then, we start a 7 seconds to drop the database
// 
ShareDatabase.prototype.drop = function() {
  var dropDatabase = this.worker.promisify( this.database, 'destroy')
  var timeoutInSeconds = 7
  
  this.log("securing %s …", this.name)
  this.sendSecurityUpdateRequest(['_admin'])

  this.log("dropping %s in %ss …", this.name, timeoutInSeconds)
  setTimeout( dropDatabase, timeoutInSeconds * 1000)


}

// 
// helper methods to check if access settings for a share changed
// 
ShareDatabase.prototype.accessSettingsChanged = function(newShareObject) {
  return !this.readAccessSettingIsEqual(newShareObject) || !this.writeAccessSettingIsEqual(newShareObject);
}
ShareDatabase.prototype.readAccessSettingIsEqual = function(newShareObject) {
  var settings1 = this.properties.read || this.properties, 
      settings2 = newShareObject.read  || newShareObject;

  this.accessSettingIsEqual(settings1, settings2);
}
ShareDatabase.prototype.writeAccessSettingIsEqual = function(newShareObject) {
  var settings1 = this.properties.write, 
      settings2 = newShareObject.write;

  this.accessSettingIsEqual(settings1, settings2);
}
ShareDatabase.prototype.accessSettingIsEqual = function(settings1, settings2) {
  if (settings1 === settings2)
    return true;

  if (Array.isArray(settings1) && Array.isArray(settings2)) {
    // simple array comparision that works for us:
    // http://stackoverflow.com/a/5115066/206879
    settings1.sort();
    settings2.sort();
    return ! (settings1<settings2 || settings2<settings1);
  }
}


// 
// 
// 
ShareDatabase.prototype.log = function(message) {
  message = "[" + this.name + "]\t" + message
  this.worker.log.apply( this.worker, arguments)
}


module.exports = ShareDatabase;