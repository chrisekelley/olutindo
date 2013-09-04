// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    console.log("listening for deviceready event.")
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady(); //this is the browser
  }
  function onDeviceReady(){
    checkVersion();
    FORMY.forms = new FormCollection();
    // initialize Hoodie
    //var hoodie  = new Hoodie("http://0.0.0.0:6004/_api")
    var hoodie  = new Hoodie("http://192.168.1.60:6004/_api")
    //var hoodie  = new Hoodie("http://192.168.43.195:6004/_api")

    FORMY.loadForm = function(name, parentId, options) {
      options || (options = {});
      var form = new Form({_id: name});
      if (typeof FORMY.forms.get(name) === "undefined") {
        //console.log("fetching from db: " + name);
        form.fetch({
          success: function(form){
            var success = options.success;
            if (success) {
              form.parentId = parentId;
              //console.log("form.parentId: " + parentId);
              FORMY.forms.add(form);
              //console.log("added " + name);
              success(form);
            }
            options.error = wrapError(options.error, name, options);
          },
          error : function(){
            console.log("Error loading Form: " + JSON.stringify(arguments));
          }
        });
      } else {
        form = FORMY.forms.get(name);
        form.parentId = parentId;
        console.log("fetched from FORMY: " + name + "; parentId: " + parentId);
        var success = options.success;
        if (success) {
          success(form);
        }
      }
    };
// Preload the incident form definition to enable easier access to form elements.
//FORMY.loadForm("incident", null, {
//	success: function(form, resp){
//		//var incident = FORMY.forms.get("incident");
//    var incident = incidentForm;
//    FORMY.forms.add(form);
//		var formElements = incident.get("form_elements");
//		//console.log("form_elements: " + JSON.stringify(form_elements));
//		//formElements.each(processFormElement);
//		FORMY.village = new Array();
//		for (var i = 0; i < formElements.length; i++) {
//		    var formElement = formElements[i];
//		    if (formElement.identifier == "village") {
//		    	var enumerations = formElement.enumerations;
//		    	for (var j = 0; j < enumerations.length; j++) {
//		    		var enumeration = enumerations[j];
//		    		var value = enumeration.defaultValue;
//		    		var label = enumeration.label;
//		    		FORMY.village[value] = label;
//		    		//console.log("FORMY.village[value]:" + FORMY.village[value]);
//		    	}
//		    	//console.log("formElement: " + JSON.stringify(formElements[i]));
//		    }
//		}
//	},
//	error: function() {
//		console.log("Error loading incident: " + arguments);
//	}
//});

    var incidentJson = incidentForm;
    var incident = new Form(incidentJson);
    FORMY.forms.add(incident);
    var formElements = incident.get("form_elements");
//console.log("form_elements: " + JSON.stringify(form_elements));
//formElements.each(processFormElement);
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

    var AppRouter = Backbone.Router.extend({

      routes: {
        "/":                 							"home",    			// #home
        "home/:startkey/:startkey_docid":				"home",    			// #home
        "search/:query":        						"search",    		// #search
        "search/:query/:department":        			"search",    		// #search
        "incident":           							"incident",    		// #incident
        "arrestDocket/:query":  						"arrestDocket",    	// #arrestDocket
        "problem/:query":       						"problem",    		// #arrestDocket
        "incidentRecords/incident/:incidentId":					"incidentRecords",  // #incidentRecords
        "edit/:recordId":          						"edit",    			// #edit
        "record/:recordId":        						"record",    		// #record
        "renderForm/:formId/:parentId":					"renderForm",    	// #renderForm
        "destroy/:recordId": 							"destroy",    		// #destroy
        "design": 										"design",    		// #design
        "populate": 									"populate",    		// #populate
        "config": 										"config",    		// #config
        "*actions": 									"home" 			// matches http://example.com/#anything-here - used to point to defaultRoute
      },
      // The following route is unused.
      defaultRoute: function( actions ){
        console.log("defaultRoute route.");
        // The variable passed in matches the variable in the route definition "actions"
        FORMY.Incidents.fetch();
        page = new Page({content: "Default List of Incidents:"});
        //page = new Page({});
        (new HomeView({model: page})).render();
      },
      home: function (startkey, startkey_docid) {
        console.log("home route. startkey: " + startkey);
        $("#recordView").remove();
        $("#formRenderingView").remove();
        $("#designer").remove();
        $("#homePageView").remove();
        if (! $("#homePageView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "homePageView");
          $("#views").append(viewDiv);
        }
        //var limit = 16;
        //var searchResults = new IncidentsList();
        //searchResults.db["keys"] = null;
        //var viewQuery = "byIncidentSorted?descending=true&limit=" + limit + "&startkey=" + "[" + startkey + "]" + "&startkey_docid=" + startkey_docid;
//        if (startkey == null || startkey == "" || startkey == "home") {
//          viewQuery = "byIncidentSorted?descending=true&limit=" + limit;
//        }
//        console.log("viewQuery: " + viewQuery);
//        searchResults.db["view"] = [viewQuery];



//        console.log("hoodie.account.username: "  + hoodie.account.username) ;
//        if(typeof hoodie.account.username === 'undefined'){
//          console.log("not logged in.")
//          // alert("Click on the yellow row and sign in.")
//          FORMY.Incidents = searchResults;
//          var page = new Page({content: "Default List of Incidents:", startkey_docid:startkey_docid, startkey:startkey});
//          (new HomeView(
//              {model: page, el: $("#homePageView"), startkey_docid:startkey_docid, startkey:startkey})).render();
//        } else {
//          searchResults.fetch({fetch: 'query',
//            options: {
//              query: {
//                fun: {
//                  map: function(doc) {
//                    //emit(doc.order, null);
//                    if (doc.formId === "incident") {
//                      emit([doc.lastModified], doc);
//                    }
//                  }
//                }
//              }
//            },
//            success : function(){
//              console.log("item count: " + searchResults.length);
//              var listLength = searchResults.length;
//              //var querySize = 15
//              if (listLength < limit) {
//                limit = listLength;
//                startkey = null;
//              } else {
//                var next_start_record = searchResults.at(limit-1);
//                if (next_start_record) {
//                  startkey_docid = next_start_record.id;
//                  console.log("next_start_record: " + JSON.stringify(next_start_record));
//                  console.log("startkey_docid: " + startkey_docid);
//                  startkey = next_start_record.get("lastModified");
//                  console.log("Removing next_start_record from searchResults.")
//                  FORMY.Incidents = searchResults.remove(next_start_record);
//                }
//              }
//              if (startkey == "" || startkey == null) {	//home (/)
//                FORMY.Incidents = searchResults;
//                startkey = 16;
//                //console.log("searchResults: " + JSON.stringify(searchResults));
//              }
//              console.log("startkey: " + startkey);
//              var page = new Page({content: "Default List of Incidents:", startkey_docid:startkey_docid, startkey:startkey});
//              (new HomeView(
//                  {model: page, el: $("#homePageView"), startkey_docid:startkey_docid, startkey:startkey}));
//              //.render();
////          console.log("starting stripeme.");
////          $(".stripeMe tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over");});
////          $(".stripeMe tr:even").addClass("alt");
////          $("#noStripeMe").removeClass("alt");
////          $("#noStripeMe").addClass("noStripeMeHeader");
//              console.log("done with home.")
//            },
//            error : function(){
//              console.log("Error loading PatientRecordList: " + JSON.stringify(arguments));
//            }
//          });
//        }

        var searchResults = new IncidentsList();
        var limit = 16;
        searchResults.db["keys"] = null;
        var viewQuery = "byIncidentSorted?descending=true&limit=" + limit + "&startkey=" + "[" + this.startkey + "]" + "&startkey_docid=" + this.startkey_docid;
        if (this.startkey == null || this.startkey == "" || this.startkey == "home") {
          viewQuery = "byIncidentSorted?descending=true&limit=" + limit;
        }
        console.log("viewQuery: " + viewQuery);
        searchResults.db["view"] = [viewQuery];
        searchResults.fetch({fetch: 'query',
          options: {
            query: {
              fun: {
                map: function(doc) {
                  //emit(doc.order, null);
                  if (doc.formId === "incident") {
                    emit([doc.lastModified], doc);
                  }
                }
              }
            }
          },
              success: function(collection, response, options) {
                console.log("item count: " + collection.length);
                //var searchResults = new IncidentsList(collection);
                FORMY.Incidents = searchResults;
                var page = new Page({content: "Default List of Incidents:", startkey_docid:startkey_docid, startkey:startkey, username:hoodie.account.username});
                var Home = new HomeView(
                    {model: page, el: $("#homePageView"), startkey_docid:startkey_docid, startkey:startkey});
              }}
        );

        hoodie.account.on('signin', function (user) {
//          console.log("refresh the items.")
//          searchResults.fetch({fetch: 'query',
//                options: {
//                  query: {
//                    fun: {
//                      map: function(doc) {
//                        //emit(doc.order, null);
//                        if (doc.formId === "incident") {
//                          emit([doc.lastModified], doc);
//                        }
//                      }
//                    }
//                  }
//                }
////                success: function(collection, response, options) {
////                  console.log("item count: " + collection.length);
////                  //var searchResults = new IncidentsList(collection);
////                  FORMY.Incidents = searchResults;
////                  var page = new Page({content: "Default List of Incidents:", startkey_docid:startkey_docid, startkey:startkey});
////                  var Home = new HomeView(
////                      {model: page, el: $("#homePageView"), startkey_docid:startkey_docid, startkey:startkey});
////                }
//              }
//          );
          if (hoodie.account.username !== 'undefined') {
            console.log("setting displayUsername")
            $("#displayUsername").html("Logged in as " + hoodie.account.username);
          } else {
            console.log("hoodie.account.username - is it empty?: "  + hoodie.account.username) ;
          }
        });


      },
      search: function (searchTerm, department) {
        console.log("search route.");
        if (FORMY.SyncpointLocalDb != null) {
          console.log("FORMY.SyncpointLocalDb: " + FORMY.SyncpointLocalDb);
          Backbone.couch_connector.config.db_name = FORMY.SyncpointLocalDb;
        }
        $("#homePageView").remove();
        $("#recordView").remove();
        $("#formRenderingView").remove();
        if (! $("#homePageView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "homePageView");
          $("#views").append(viewDiv);
        }
        console.log("Searching for " + searchTerm + " department: " + department);
        var searchResults = new IncidentsList();
        var pouchdbViewname = null;
        if ((searchTerm !== "") && (searchTerm !== " ")) {
          //var searchInt = parseInt(searchTerm);
          console.log("bySearchKeywords search");
          searchResults.fetch(
              {fetch: 'query',
                options: {
                  query: {
                    fun:bySearchKeywords,
                    key:searchTerm
                  }
                },
                success: function(collection, response, options) {
                  console.log("item count: " + collection.length);
                  FORMY.Incidents = searchResults;
                  var page = new Page({content: "Default List of Incidents:", startkey_docid:this.startkey_docid, startkey:this.startkey, username:hoodie.account.username});
                  var Home = new HomeView(
                      {model: page, el: $("#homePageView"), startkey_docid:this.startkey_docid, startkey:this.startkey});
                }}
          );
        } else if (department !== "") {
          console.log("byDepartment search");
          searchResults.fetch(
              {fetch: 'query',
                options: {
                  query: {
                    fun:byDepartment,
                    key:department
                  }
                },
                success: function(collection, response, options) {
                  console.log("item count: " + collection.length);
                  FORMY.Incidents = searchResults;
                  var page = new Page({content: "Default List of Incidents:", startkey_docid:this.startkey_docid, startkey:this.startkey, username:hoodie.account.username});
                  var Home = new HomeView(
                      {model: page, el: $("#homePageView"), startkey_docid:this.startkey_docid, startkey:this.startkey});
                }}
          );
        } else {
          //console.log("This should reset the collection.");
//          searchResults.db["keys"] = null;
//          searchResults.db["view"] = ["byIncidentSorted?descending=true&limit=16"];
        }
      },
      incident: function () {
        $("#homePageView").remove();
        $("#recordView").remove();
        $("#formRenderingView").remove();
        if (! $("#formRenderingView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
        }
        if (FORMY.SyncpointLocalDb != null) {
          console.log("FORMY.SyncpointLocalDb: " + FORMY.SyncpointLocalDb);
          Backbone.couch_connector.config.db_name = FORMY.SyncpointLocalDb;
        }
        FORMY.loadForm("incident", null, {
          success: function(form, resp){
            var newModel = new Form();
            var newPatientFormView = new FormView({model: form, el: $("#formRenderingView")});
            newPatientFormView.render();
            $(document).ready(function() {
              //$("#" + identifier).datepicker({
              //$("#dateReported").datepicker({
              loadCascadedSelects();
              $('.datep').each(function () {
                //console.log("init dateppicker");
//        				        var currentYear = (new Date).getFullYear();
//        				        var minDate = getDateYymmdd($(this).data("val-rangedate-min"));
//        				        var maxDate = getDateYymmdd($(this).data("val-rangedate-max"));
                $(this).datepicker({
                  dateFormat: "mm/dd/yy",  // hard-coding uk date format, but could embed this as an attribute server-side (based on the current culture)
                  //minDate: minDate,
                  //maxDate: maxDate,
                  changeYear: true,
                  //yearRange: '1900:' + currentYear,
                  autoSize: true,
                  // appendText: ' (mm/dd/yyyy)',
                  buttonImage: 'images/calendar.gif',
                  buttonImageOnly: true,
                  constrainInput: true,
                  showOn: 'both',
                  //showButtonPanel: true,
                  buttonText: 'Choose',
                  //navigationAsDateFormat: true,
                  //currentText: '\'Today\'',
                  gotoCurrent: true
                  //onClose: function (dateText, inst) { alert(dateText); }
                });
              });
            });
          },
          error: function() {
            console.log("Error loading incident: " + arguments);
          }
        });
      },
      renderForm: function (formId, parentId) {
        $("#homePageView").remove();
        $("#recordView").remove();
        $("#formRenderingView").remove();
        if (! $("#formRenderingView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
        }
        FORMY.sessionRecord.fetch( {
          success: function(model){
            console.log("Just successfully fetched the incident.");
            FORMY.loadForm(formId, parentId, {
              success: function(form){
                console.log("form: " + JSON.stringify(form));
//      					form.set({"patientMiddle_name": patient.get('Middle_name')});
                form.set({"recordId": FORMY.sessionRecord.get('_id')});
                form.set({"parentId": parentId});
                //(new FormView({model: FORMY.sessionRecord, currentForm:form, el: $("#recordView")})).render();
                (new FormView({model: new Form(), currentForm:form, el: $("#formRenderingView")})).render();
              },
              error : function(){
                console.log("Error loading form: " + arguments);
              }
            });
          }
        });
      },
      incidentRecords: function (incidentId) {
        console.log("incidentRecords route.");
        $("#homePageView").remove();
        $("#formRenderingView").remove();
        if (! $("#recordView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "recordView");
          $("#views").append(viewDiv);
        }
        //Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        FORMY.sessionRecord = new Incident();
        FORMY.sessionRecord.id = "incident/" + incidentId;
        //FORMY.sessionRecord = new Incident();

//        searchResults.fetch(
//            {fetch: 'query',
//              options: {
//                query: {
//                  fun:bySearchKeywords,
//                  key:searchTerm
//                }
//              },
//              success: function(collection, response, options) {
//                console.log("item count: " + collection.length);
//                FORMY.Incidents = searchResults;
//                var page = new Page({content: "Default List of Incidents:", startkey_docid:this.startkey_docid, startkey:this.startkey, username:hoodie.account.username});
//                var Home = new HomeView(
//                    {model: page, el: $("#homePageView"), startkey_docid:this.startkey_docid, startkey:this.startkey});
//              }}
//        );



        FORMY.sessionRecord.fetch( {
          //fetch: 'query',
//
//          options: {
////            query: {
////              fun:{
////                map: function(doc) {
////                  if (doc.type === 'incident') {
////                    console.log("incident: " + JSON.stringify(doc));
////                    emit(doc.position, doc)
////                  }
////                }
////              },
////              key:"incident/" + incidentId
////            },
////            get: {
////              docid:"incident/" + incidentId
////            }
//            get: "incident/" + incidentId,
//            key:"incident/" + incidentId
//          },
//
          //success: function(model){
          success: function(model, response, options) {
            console.log("Just successfully fetched the incident.");
//            FORMY.sessionRecord.records = new IncidentRecordList();
//            FORMY.sessionRecord.records.db["keys"] = [incidentId];
            //FORMY.sessionRecord.records.fetch({
            //success : function(){
            //console.log("Records:" + JSON.stringify(patient.Records));
            //console.log("Fetching Records for :" + incidentId);
            //(new IncidentView({model: FORMY.sessionRecord})).render();
            //(new RecordView({model: record, currentForm:form, el: $("#recordView")})).render();
            console.log("record: " + JSON.stringify(FORMY.sessionRecord));
            FORMY.loadForm(FORMY.sessionRecord.get("formId"), incidentId, {
              //success: function(form){
              success: function(form, response, options) {
                //console.log("form: " + JSON.stringify(form));
//                    			form.set({"patientSurname": patient.get('surname')});
//                    			form.set({"patientForenames": patient.get('forenames')});
//                    			form.set({"patientMiddle_name": patient.get('Middle_name')});
                form.set({"assignedId": FORMY.sessionRecord.get('assignedId')});
                form.set({"created": FORMY.sessionRecord.get('created')});
                form.set({"lastModified": FORMY.sessionRecord.get('lastModified')});
                form.set({"recordId": FORMY.sessionRecord.get('_id')});
                form.set({"parentId": FORMY.sessionRecord.get('_id')});
                //(new RecordView({model: FORMY.sessionRecord, currentForm:form, el: $("#recordView")})).render();
                var recordView = new RecordView({model: FORMY.sessionRecord, el: $("#recordView")})
                recordView.currentForm = form;
                recordView.render();

              }
            });
//              },
//              error : function(){
//                console.log("Error loading PatientRecordList: " + arguments);
//              }
            //});
          }
        });
      },
      edit: function (recordId) {
        $("#homePageView").remove();
        $("#formRenderingView").remove();
        $("#recordView").remove();
        if (! $("#formRenderingView").length){
          //$("#views").append("<div id=\"formRenderingView\"></div>");
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
        }
        var record = new Record({_id: recordId});
        record.fetch( {
          success: function(model){
            var parentId = record.get("parentId");
            if (parentId != null) {
              var parent = new Incident({_id: record.get("parentId")});
              console.log("just made a new instance of a patient.");
              parent.fetch( {
                success: function(model){
                  console.log("Just successfully fetched the parent.");
                  FORMY.sessionRecord = parent;
                  console.log("record: " + JSON.stringify(record));
                  FORMY.loadForm(record.get("formId"), null,{
                    success: function(form){
                      form.set({"patientSurname": patient.get('surname')});
                      form.set({"patientForenames": patient.get('forenames')});
                      form.set({"patientMiddle_name": patient.get('Middle_name')});
                      form.set({"parentId": parent.get('_id')});
                      (new FormView({model: record, currentForm:form, el: $("#formRenderingView")})).render();
                    },
                    error : function(){
                      console.log("Error loading form: " + arguments);
                    }
                  });
                }
              });
            } else {
              FORMY.loadForm(record.get("formId"), null,{
                success: function(form){
                  (new FormView({model: record, currentForm:form, el: $("#formRenderingView")})).render();
                  $(document).ready(function() {
                    loadCascadedSelects();
                  });
                },
                error : function(){
                  console.log("Error loading form: " + arguments);
                }
              });
            }
          },
          error : function(){
            console.log("Error loading FormView: " + arguments);
          }
        });
      },
      record: function (recordId) {
        $("#homePageView").remove();
        $("#formRenderingView").remove();
        $("#formRenderingView").remove();
        if (! $("#recordView").length){
          //$("#views").append("<div id=\"formRenderingView\"></div>");
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "recordView");
          $("#views").append(viewDiv);
        }

        var record = new Record({_id: recordId});
        record.fetch( {
          success: function(model){
            var patient = new Patient({_id: record.get("patientId")});
            console.log("just made a new instance of a patient.");
            patient.fetch( {
              success: function(model){
                console.log("Just successfully fetched the patient.");
                FORMY.sessionRecord = patient;
                console.log("record: " + JSON.stringify(record));
                FORMY.loadForm(record.get("formId"), null,{
                  success: function(form){
                    form.set({"patientSurname": patient.get('surname')});
                    form.set({"patientForenames": patient.get('forenames')});
                    form.set({"patientMiddle_name": patient.get('Middle_name')});
                    form.set({"recordId": record.get('_id')});
                    form.set({"patientId": patient.get('_id')});
                    (new RecordView({model: record, currentForm:form, el: $("#recordView")})).render();
                  },
                  error : function(){
                    console.log("Error loading form: " + arguments);
                  }
                });
              }
            });
          },
          error : function(){
            console.log("Error loading FormView: " + arguments);
          }
        });
      },
      destroy: function (recordId) {
        var record = new Record({_id: recordId});
        record.fetch( {
          success: function(model){
            record.destroy( {
              success: function(model, response){
                var parentId = record.get("parentId");
                if (parentId != null) {
                  console.log("Just successfully deleted the record for parentId: " + parentId);
                  FORMY.router.navigate('incidentRecords/' + patientId, true);
                } else {
                  FORMY.router.navigate('home', true);
                }
              },
              error : function(){
                console.log("Error loading form: " + arguments);
              }
            });
          },
          error : function(){
            console.log("Error loading record: " + arguments);
          }
        });
      },
      populate: function () {
        console.log("populate route ");
        var answer = confirm("Populate database with test data?");
        if (answer) {
          $("#homePageView").remove();
          $("#recordView").remove();
          $("#formRenderingView").remove();
          $("#designer").remove();
          if (! $("#homePageView").length){
            var viewDiv = document.createElement("div");
            viewDiv.setAttribute("id", "homePageView");
            $("#views").append(viewDiv);
          }

          db = $.couch.db(Backbone.couch_connector.config.db_name);
          var testdoc = null;
          ct = 0;
          opts = { success : function(){ }, error : function(){ console.log("could not populate"); }};
          function randomFromTo(from, to){
            return Math.floor(Math.random() * (to - from + 1) + from);
          };
          var countTestDocs = 30;

          while (ct < (countTestDocs+1)) {
            ct++;
            var subcounty=randomFromTo(1,8).toString();
            var village=randomFromTo(1,180).toString();
            var priority=randomFromTo(1,3).toString();
            var department=randomFromTo(1,6).toString();
            var resolved=randomFromTo(0,1).toString();
            var month=randomFromTo(1,10);
            var day=randomFromTo(1,31);
            switch (month) {
              case 10:
                day=randomFromTo(1,11);
                break;
              case 9:
                day=randomFromTo(1,30);
                break;
              case 4:
                day=randomFromTo(1,30);
                break;
              case 2:
                day=randomFromTo(1,27);
                break;
              case 6:
                day=randomFromTo(1,30);
                break;
              case 11:
                day=randomFromTo(1,30);
                break;
              default:
                day=randomFromTo(1,31);
                break;
            }
            var unixTimestamp = Math.round(+new Date()/1000);
            var created  =  unixTimestamp;
            var lastModified =  created;

            //var id =  "test" + ct;
            var id =  "test" + ct + "_" + created;
            testdoc = { _id : id, "flowId": "300","formId": "incident","phone": "0772555"+ ct,"description": "This is a test",
              "subcounty": subcounty,"village": village,"priority": priority,"department": department,"assignedId": ct.toString(),
              "resolved":resolved, "created": created,"lastModified": lastModified,"collection": "incident"};
            console.log("testdoc: " + JSON.stringify(testdoc));
            db.saveDoc(testdoc, opts);
          }
          FORMY.router.navigate('home', true);
        } else {
          alert("Data population cancelled.");
        }
      }
    });

// Initiate the router
    FORMY.router = new AppRouter();

// Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    console.log("started Backbone history")
    //FORMY.Incidents = new IncidentsList();

    // setup Hoodie shares
    var hostname = window.location.host;
    //if (hostname === "192.168.1.60:6004") {
    // console.log("Setting up share on server: " + hostname)
    var share;
    //share = new Hoodie.Share(this.hoodie);
    // user%2F1013313 is the kay database name.
//    share = hoodie.share('user%2F1013313');
//    share.subscribe();
    // open a share and load all its objects
//    hoodie.share('user/qaikby4').findAll("incident").done(function (objects) {
//      var i=0;
//      var cnt = objects.length;
//      while (i < (cnt+1)) {
//        i++;
//        console.log("JSON: " + JSON.stringify(this));
//      }
//    });

    //hoodie.share('user/qaikby4').grantWriteAccess(["1013313","2122682"]);
    //hoodie.share('user/qaikby4').subscribe();

    // add a new share and add some of my objects to it in one step
//
//  hoodie.store.findAll('incident').share()
//      .done(function (incidents, share) { console.log('shared at ' + share.id); } );


    //hoodie.share.add().done(function (share) {console.log('shared at ' + share.id)});
    //hoodie.store.findAll('incident').shareAt('t47aqmv');

    console.log("hoodie.account.username: "  + hoodie.account.username) ;
    if (hoodie.account.username === "andro") {
      //hoodie.share('tex5a7i').subscribe();
      // open a share and load all its objects
//    hoodie.share('tex5a7i').findAll()
//        .done(function (objects) {console.log("The tex5a7i share contents: " + JSON.stringify(objects))});
    }
    var useragent = navigator.userAgent;
    if (useragent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      console.log("testing for window.Version.")
      window.plugins.version.getVersionCode(
          function(version_code) {
            //do something with version_code
            console.log("version_code: " + version_code);
          },
          function(errorMessage) {
            //do something with errorMessage
            console.log(errorMessage);
          }
      );
    }

    //hoodie.share('user/tex5a7i').grantReadAccess('z36wk2v');

    //hoodie.share('tex5a7i').grantWriteAccess('z36wk2v');

    FORMY.ReplicationStarted = null;

    var ErrorLog = function(err, res) {
      console.log("err: " + JSON.stringify(err));
    }

    var StartReplication = function () {
      console.log("start replication with " + remoteCouch)
      FORMY.ReplicationStarted = true;
      var opts = {continuous: true, withCredentials:true, cookieAuth: {username:'testuser', password:'testuserPassword'}, auth: {username:'testuser', password:'testuserPassword'}};
    //var opts = {continuous: true, withCredentials:true};
      //var opts = {continuous: true};
      Backbone.sync.defaults.db.replicate.to(remoteCouch, opts, ErrorLog);
      //localDB.replicate.from('http://relax.com/on-the-couch', {withCredentials:true, cookieAuth: {username:'admin', password:'pass'}}, function(){});
      Backbone.sync.defaults.db.replicate.from(remoteCouch, opts, ErrorLog);
    }

    hoodie.account.on('signin', function (user) {
      StartReplication();
      $("#displayUsername").html("Logged in as " + hoodie.account.username);
    });

    if (hoodie.account.username !== 'undefined') {
      console.log("setting displayUsername")
      $("#displayUsername").html("Logged in as " + hoodie.account.username);
      if (FORMY.ReplicationStarted == null) {
        StartReplication();
      }
    } else {
      console.log("hoodie.account.username - is it empty?: "  + hoodie.account.username) ;
    }

  }

});
