var IncidentsList = Backbone.Collection.extend({
	initialize: function() {
		//_.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
		//_.bindAll(this, 'url');
		this.page = 1;
    this.type = "incident";
	},
	db : {
		//view: "byPatientSorted?limit=15",
		view: "byId",
		//changes : true,
	},
	url : "/incident",
  type: "incident",
	model : Incident
});

FORMY.Incidents = new IncidentsList();