var FORMY = {};
/** Configure the database **/

// "http://192.168.1.60:6004/_api"
//var couchServer = "http://192.168.1.60:6004/_api";
//var remoteCouch = "https//0.0.0.0:6006/user%2Ffhefv4d/";
//Backbone.connect("http://192.168.1.60:6004/_api") // creates a new hoodie at Backbone.hoodie

var ua = navigator.userAgent;
if( ua.indexOf("Android") >= 0 )
{
  var is412 = ua.indexOf("4.1.2");
  var isGTP6200 = ua.indexOf("GT-P6200");
  console.log("is412: " + is412 + " isGTP6200:" + isGTP6200);
  if ((is412) && (isGTP6200))
  {
    console.log("forcing websql.")
    Backbone.sync = BackbonePouch.sync({
      db: PouchDB('websql://troubletickets')
    });
  } else {
    console.log("Letting Pouch decide the preferred adapter.")
    Backbone.sync = BackbonePouch.sync({
      db: PouchDB('troubletickets')
    });
  }
} else {
  console.log("Letting Pouch decide the preferred adapter.")
  Backbone.sync = BackbonePouch.sync({
    db: PouchDB('troubletickets')
  });
}

Backbone.Model.prototype.idAttribute = '_id';

var onComplete = function(err, result) {
  if (result.ok) {
    console.log("Replication is fine. ")
  } else {
    console.log("err: " + JSON.stringify(err));
  }
}

//var opts = {continuous: true, complete: onComplete};
//var opts = {continuous: true};


//var url = model.get('url'),
//    pushResps = this.pushResps,
//    pullResps = this.pullResps,
//    renderStats = _.bind(this.renderStats, this);
//
//Pouch.replicate(dbname, url, {
//  continuous: true,
//  onChange: function(resp) {
//    pushResps[url] = resp;
//    renderStats();
//  }
//});
//Pouch.replicate(url, dbname, {
//  continuous: true,
//  onChange: function(resp) {
//    pullResps[url] = resp;
//    renderStats();
//  }
//});

//FORMY.SyncpointLocalDb = null;
// findSyncpointLocalDb();
//	Backbone.couch_connector.config.ddoc_name = "coconut";
//if (FORMY.SyncpointLocalDb == null) {
//	Backbone.couch_connector.config.db_name = "coconut";
//} else {
//	console.log("FORMY.SyncpointLocalDb: " + FORMY.SyncpointLocalDb);
//	Backbone.couch_connector.config.db_name = FORMY.SyncpointLocalDb;
//}
//// If set to true, the connector will listen to the changes feed
//// and will provide your models with real time remote updates.
//// But in this case we enable the changes feed for each Collection on our own.
//Backbone.couch_connector.config.global_changes = false;

//This allows us to have separate template files
var loadTemplate = function(filename){
	//console.log("filename in config: " + filename);
var templateFunction;
$.ajax("app/templates/" + filename,{
  async:false, // make sure we pause execution until this template is loaded
  success: function(result){
	  //console.log("result: " + result);
    templateFunction = Handlebars.compile(result);
  }
});
    // console.log("templateFunction: " + templateFunction);
return templateFunction;
};
//var supportsOrientationChange = "onorientationchange" in window,
//orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
