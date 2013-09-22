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
    }
    FORMY.forms = new FormCollection();
    // initialize Hoodie - this is for the account form only.
//    var hoodie  = new Hoodie();

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

    var AppRouter = Backbone.Router.extend({

      routes: {
        "/":                 							"home",    			// #home
        "home/:startkey/:startkey_docid":				"home",    			// #home
        "search/:query":        						"search",    		// #search
        "search/:query/:department":        			"search",    		// #search
        "incident":           							"incident",    		// #incident
        "actionTaken/incident/:incidentId":           							"actionTaken",    		// #actionTaken
        "arrestDocket/:query":  						"arrestDocket",    	// #arrestDocket
        "problem/:query":       						"problem",    		// #arrestDocket
        "incidentRecords/incident/:incidentId":					"incidentRecords",  // #incidentRecords
        "edit/incident/:recordId":          						"edit",    			// #edit
        "editActionTaken/:recordId":          						"editActionTaken",    			// #edit
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
        $("#configView").remove();
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

        var searchResults = new IncidentsList();
        var limit = 16;
        searchResults.db["keys"] = null;
//        var viewQuery = "byIncidentSorted?descending=true&limit=" + limit + "&startkey=" + "[" + this.startkey + "]" + "&startkey_docid=" + this.startkey_docid;
//        if (this.startkey == null || this.startkey == "" || this.startkey == "home") {
//          viewQuery = "byIncidentSorted?descending=true&limit=" + limit;
//        }
        //searchResults.db["view"] = [viewQuery];
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
              },
              descending:true
            }
          },
              success: function(collection, response, options) {
                console.log("item count: " + collection.length);
                //var searchResults = new IncidentsList(collection);
                FORMY.Incidents = searchResults;
                var page = new Page({content: "Default List of Incidents:", startkey_docid:startkey_docid, startkey:startkey});
                var Home = new HomeView(
                    {model: page, el: $("#homePageView"), startkey_docid:startkey_docid, startkey:startkey});
              }}
        );
      },
      search: function (searchTerm, department) {
        console.log("search route.");
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
                  var page = new Page({content: "Default List of Incidents:", startkey_docid:this.startkey_docid, startkey:this.startkey});
                  var Home = new HomeView(
                      {model: page, el: $("#homePageView"), startkey_docid:this.startkey_docid, startkey:this.startkey});
                }}
          );
        } else if (department !== "") {
          console.log("Department search");

          searchResults.fetch(
              {fetch: 'query',
                options: {
                  query: {
                    fun:byDepartment(department),
                    descending:true
                  }
                },
                success: function(collection, response, options) {
                  console.log("item count: " + collection.length);
                  FORMY.Incidents = searchResults;
                  var page = new Page({content: "Default List of Incidents:", startkey_docid:this.startkey_docid, startkey:this.startkey});
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
        console.log("incident route.");
        $("#homePageView").remove();
        $("#recordView").remove();
        $("#formRenderingView").remove();
        if (! $("#formRenderingView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
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
            });
          },
          error: function() {
            console.log("Error loading incident: " + arguments);
          }
        });
      },
      actionTaken: function (incidentId) {
        console.log("incident route.");
        $("#homePageView").remove();
        $("#recordView").remove();
        $("#formRenderingView").remove();
        if (! $("#formRenderingView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
        }
        FORMY.loadForm("actionTaken", null, {
          success: function(form, resp){
            var newModel = new Form();
            var newPatientFormView = new FormView({model: form, el: $("#formRenderingView")});
            newPatientFormView.parentId = "incident/" + incidentId;

            var record = new Record({_id: newPatientFormView.parentId, id: newPatientFormView.parentId});
            record.fetch( {
                  success: function(record){
                    console.log("Fetched record: " + JSON.stringify(record));
                    newPatientFormView.parentRecord = record;
                    newPatientFormView.render();
                  }
                }
            )
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
        console.log("incidentRecords route. incidentId: " + incidentId);
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
        FORMY.sessionRecord.fetch( {
          success: function(model, response, options) {
            console.log("Just successfully fetched the incident.");
            console.log("record: " + JSON.stringify(FORMY.sessionRecord));
            FORMY.loadForm(FORMY.sessionRecord.get("formId"), incidentId, {
              success: function(form, response, options) {
                //console.log("form: " + JSON.stringify(form));
                form.set({"assignedId": FORMY.sessionRecord.get('assignedId')});
                form.set({"created": FORMY.sessionRecord.get('created')});
                form.set({"lastModified": FORMY.sessionRecord.get('lastModified')});
                form.set({"recordId": FORMY.sessionRecord.get('_id')});
                form.set({"parentId": FORMY.sessionRecord.get('_id')});

                var actionTakens = new IncidentsList();
                console.log("byParentId search");
                actionTakens.fetch(
                    {fetch: 'query',
                      options: {
                        query: {
                          fun:byParentId,
                          key:FORMY.sessionRecord.id
                        }
                      },
                      success: function(collection, response, options) {
                        console.log("item count: " + collection.length);
                        FORMY.sessionRecord.actionTakens = actionTakens;
                        form.set({"actionTakens": actionTakens});
                        var recordView = new RecordView({model: FORMY.sessionRecord, el: $("#recordView")})
                        recordView.currentForm = form;
                        recordView.render();
                      }}
                );
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
        console.log("incidentRecords route. incidentId: " + recordId);
        $("#homePageView").remove();
        $("#formRenderingView").remove();
        $("#recordView").remove();
        if (! $("#formRenderingView").length){
          //$("#views").append("<div id=\"formRenderingView\"></div>");
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
        }
        var record = new Record({_id: "incident/"+ recordId, id: "incident/"+ recordId});
        record.fetch( {
          success: function(model){
            console.log("Fetched record: " + JSON.stringify(model));
            FORMY.loadForm("incident", null, {
              success: function(form, resp){
                var newModel = new Form();
                var newPatientFormView = new FormView({model: form, el: $("#formRenderingView")});
                newPatientFormView.currentRecord = record;
                newPatientFormView.render();
                $(document).ready(function() {
                  loadCascadedSelects();
                });
              },
              error: function(err) {
                console.log("Error loading incident: " + err);
              }
            });
          },
          error : function(){
            console.log("Error loading Record: " + arguments);
          }
        });
      },
      editActionTaken: function (recordId) {
        console.log("editActionTaken route. recordId: " + recordId);
        $("#homePageView").remove();
        $("#formRenderingView").remove();
        $("#recordView").remove();
        if (! $("#formRenderingView").length){
          //$("#views").append("<div id=\"formRenderingView\"></div>");
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "formRenderingView");
          $("#views").append(viewDiv);
        }
        var record = new Record({_id: recordId, id: recordId});
        record.fetch( {
          success: function(model){
            console.log("Fetched record: " + JSON.stringify(model));
            FORMY.loadForm("actionTaken", null, {
              success: function(form, resp){
                var newModel = new Form();
                var newPatientFormView = new FormView({model: form, el: $("#formRenderingView")});
                newPatientFormView.currentRecord = record;
                newPatientFormView.render();
              },
              error: function(err) {
                console.log("Error loading incident: " + err);
              }
            });
          },
          error : function(){
            console.log("Error loading Record: " + arguments);
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
      config: function () {
        console.log("config route.");
        $("#homePageView").remove();
        $("#formRenderingView").remove();
        $("#recordView").remove();
        $("#homePageView").remove();
        if (! $("#configView").length){
          var viewDiv = document.createElement("div");
          viewDiv.setAttribute("id", "configView");
          $("#views").append(viewDiv);
        }
        var page = new Page({content: "Configuration"});
        (new ConfigView({model: page, el: $("#configView")})).render();

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

    FORMY.ReplicationStarted = null;
    StartReplication();

  }

});
