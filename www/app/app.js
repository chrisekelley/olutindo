// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    console.log("listening for deviceready event.")
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady(); //this is the browser
  }
  function onDeviceReady(){
    $(function() {
      FastClick.attach(document.body);
    });
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      checkVersion();

      var ActionBar = ActionBarSherlock;

      console.log("ActionBarSherlock: " + JSON.stringify(ActionBarSherlock));

      // Show Logo / Title
      ActionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_TITLE);

      // Set navigation mode to standard
      ActionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);

      ActionBar.setMenu([
        { icon: 'R.drawable.ic_menu_home', text: 'Home',show: ActionBar.SHOW_AS_ACTION_ALWAYS, click: "FORMY.router.navigate('config', true)" },
        { icon: 'R.drawable.ic_action_search', text: 'Search', type: 'SearchView',show: ActionBar.SHOW_AS_ACTION_ALWAYS | ActionBar.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW, click: "FORMY.router.navigate('search/KEYWORD', true);"},
        { icon: 'R.drawable.ic_action_refresh', text: 'Refresh',show: ActionBar.SHOW_AS_ACTION_ALWAYS, click: 'console.log("Refresh"); '}
      ]);

    }


    FORMY.forms = new FormCollection();

    FORMY.loadForm = function(name, parentId, options) {
      options || (options = {});
      var form = new Form({_id: name});
      form = FORMY.forms.get(name);
      form.parentId = parentId;
      console.log("fetched from FORMY: " + name + "; parentId: " + parentId);
      var success = options.success;
      if (success) {
        success(form);
      }
    };

    var incidentJson = incidentForm;
    var incident = new Form(incidentJson);
    FORMY.forms.add(incident);
    var formElements = incident.get("form_elements");
    FORMY.village = new Array();
    for (var i = 0; i < formElements.length; i++) {
      var formElement = formElements[i];
      if (formElement.identifier == "village") {
        var enumerations = formElement.enumerations;
        for (var j = 0; j < enumerations.length; j++) {
          var enumeration = enumerations[j];
          var value = enumeration.defaultValue;
          var label = enumeration.label;
          FORMY.village[value] = label;
          //console.log("FORMY.village[value]:" + FORMY.village[value]);
        }
        //console.log("formElement: " + JSON.stringify(formElements[i]));
      }
    }

    var actionTaken = new Form(actionTakenForm);
    FORMY.forms.add(actionTaken);

// Wrap an optional error callback with a fallback error event.
// kudos: http://stackoverflow.com/questions/7090202/error-callback-always-fired-even-when-it-is-successful/7101589#7101589
    var wrapError = function(onError, model, options) {
      return function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (onError) {
          onError(model, jqXHR, options);
        } else {
          //model.trigger('error', model, jqXHR, options);
          var message = "Error with " + name + " resp: " + resp;
          console.log(message);
          alert(message);
        }
      };
    };

// Initiate the router
    FORMY.router = new AppRouter();

// Init the RegionManager
    FORMY.RegionManager = new RegionManager();

// Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    console.log("started Backbone history")
    //FORMY.Incidents = new IncidentsList();

    FORMY.ReplicationStarted = null;
    FORMY.SyncStatus = new SyncStatus();
    var account = getLoginPreferences();
    StartReplication(account);
    UrbanAirshipRegistration(account);
  }

  Backbone.View.prototype.close = function () {
//    this.$el.empty();
//    this.unbind();
    console.log("closing this view.")
    this.remove();
    this.unbind();
    if (this.onClose){
      this.onClose();
    }
  };

});
