var HomeView = Backbone.View.extend({
	el: '#container',
  initialize: function() {
    console.log("HomeView initialize");

   // _.bindAll(this, 'addOne', 'reseted', 'render', 'search', 'nextLink');
//    FORMY.Incidents.bind('add',   this.addOne, this);
    //FORMY.Incidents.bind('search',   this.search, this);
//    FORMY.Incidents.bind('reset', this.reseted, this);
//    FORMY.Incidents.bind('all',   this.render, this);
//    FORMY.Incidents.bind('change', this.search, this);
//    FORMY.Incidents.bind('render', this.render, this);

    this.alertMessage = this.$('alertMessage');

    this.listenTo(FORMY.Incidents, 'add', this.addOne);
    this.listenTo(FORMY.Incidents, 'reset', this.addAll);
    this.listenTo(FORMY.Incidents, 'all', this.render);
    this.listenTo(FORMY.SyncStatus, 'all', this.render);
  },
	username: null,
	startkey: null,
	startkey_docid: null,
	endkey: null,
	endkey_docid: null,
	addOne : function(record){
    if ((record.attributes.type != null) && (record.attributes.type === "incident")) {
      var view = new SearchListItemView({model: record});
      //this.rendered = this.view.render().el;
      //console.log("add one in HomeView:" + JSON.stringify(record));
      this.$("#incidents").append(view.render().el);
    } else {
      console.log("Skipping this record - not an incident.")
    }
	},
  changeSyncStatus: function(message) {
    this.alertMessage.html(message);
  },
	events: {
		"click #form-search " : "search",
		"click #form-client " : "incidentLink",
		"click #form-config " : "configLink",
		"click #nextLink"	  : "nextLink",
    "change #department"  : "search"
		//"orientationEvent " : "orientation",
	},
	reseted: function() {
		console.log("reseted; Incidents count: " + FORMY.Incidents.length);
		$(this.el).html("");
		FORMY.Incidents.each(this.addOne);
	},
	remove: function() {
		console.log("remove the view in homeView");
		$(this.el).remove();
	},
	nextLink: function() {
		console.log("endkey: " + this.model.get("endkey"));
		if (this.model.get("endkey") != null) {
			//FORMY.router.navigate('home/' + this.model.get("startkey") + '/' + this.model.get("startkey_docid"), true);
      FORMY.router.navigate('home/' + this.model.get("endkey"), true);
      //FORMY.router.navigate('home/' + this.model.get("startkey"), true);
		} else {
			console.log("nextLink");
		}
	},
	incidentLink: function() {
		FORMY.router.navigate('incident', true);
	},
	configLink: function() {
    console.log("clicked configLink.")
		FORMY.router.navigate('config', true);
	},
	search: function(e) {
		e.preventDefault();
		var searchTerm =  $('#search_string').val();
		var department =  $('#department').val();
		//FORMY.router.navigate('search/' + searchTerm, true);
		if (searchTerm == "" && department == "") {
			console.log("No search terms; Back to home");
			FORMY.router.navigate('home', true);
		} else if (searchTerm == "" && department != "") {
			console.log("Searching department");
			searchTerm = " ";
			FORMY.router.navigate('search/' + searchTerm + "/" + department, true);
		} else {
			console.log("Searching keyword");
			FORMY.router.navigate('search/' + searchTerm, true);
		}
	},

	//orientation: "horiz",
	//reportEducationInstance:null,
	render: function() {
//		$("#formRenderingView").remove();
//		$("#recordView").remove();
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		//this.content = this.model.toJSON();
    console.log("HomeView render.");
    var limit = 16;
    this.template =  loadTemplate("home.vert.template.html");

    var viewPortWidth = window.innerWidth
    var viewPortHeight = window.innerHeight
    console.log("viewPortWidth: " + viewPortWidth + " viewPortHeight:" + viewPortHeight)
		this.html = this.template(this.model.toJSON());
		//$(this.el).html(homeViewHtml);
		//$("body").html(homeViewHtml);
		//if(FORMY.Incidents.length > 0){
		FORMY.Incidents.each(this.addOne);
		console.log("Looped through the Incidents")
//		$(".stripeMe tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over");});
//		$(".stripeMe tr:even").addClass("alt");
//    console.log("Applied .stripeME to tr's.")
    this.alertMessage.show();
    console.log("FORMY.SyncStatus.html: " + FORMY.SyncStatus.html)
    //this.alertMessage.html(FORMY.SyncStatus.html);
    $("#alertMessage").html(FORMY.SyncStatus.html);
		return this;
	},
  onClose: function(){
    console.log("Closing the model.")
    this.model.unbind("change", this.render);
  }
});

var SearchListItemView = Backbone.View.extend({
	tagName : "tr",
	template: Handlebars.compile($("#search-template").html()),

	initialize : function(){
		//this.model.bind('change', this.render, this);
		// from backbone-couch.js chat example:
//		 _.bindAll(this, 'render');
//		this.model.bind('change', this.render);
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
	},

	render : function(){ 
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		$(this.el).html(this.html);
		//console.log("render SearchListItemView: "+ JSON.stringify(this.html));
		return this;
	}
});
