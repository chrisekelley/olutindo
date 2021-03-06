var RecordView = Backbone.View.extend({
	//el: $("#recordView"),
	template: loadTemplate("record.template.html"),
	initialize: function() {
		_.bindAll(this, "render", "addOne");
		//return this;
	},
	render: function() {
		if (window.orientation == -90) {
			this.orientation = "vert";
			this.template =  loadTemplate("record.vert.template.html");
		} else {
			this.orientation = "vert";
			this.template =  loadTemplate("record.vert.template.html");
			//this.template =  loadTemplate("home.template.html");
		}
    var viewPortWidth = window.innerWidth
    var viewPortHeight = window.innerHeight
    console.log("viewPortWidth: " + viewPortWidth + " viewPortHeight:" + viewPortHeight)

		//console.log("this.model in RecordView: "+ JSON.stringify(this.model.toJSON()));
		//this.form = this.options.currentForm;
    this.form = this.currentForm;
    //console.log("form: " + JSON.stringify(this.form));
		this.patientId = this.currentForm.patientId;
//		var flow = this.currentForm.get("flow");
		var flowId = null;
		var formId = this.currentForm.get("_id");
		var created = this.model.created;
		this.formElements = new FormElements(this.currentForm.get("form_elements"), { view: this });
		var patientIdWidget = {"label": "patientIdWidget","value":this.patientId,"identifier": "patientId","inputType": "hidden"};
		var flowIdWidget = {"label": "flowIdWidget","value": flowId,"identifier": "flowId","inputType": "hidden"};
		var formIdWidget = {"label": "formIdWidget","value": formId,"identifier": "formId","inputType": "hidden"};
		//var createdWidget = {"label": "createdWidget","value": created,"identifier": "created","inputType": "text"};
		this.formElements.add(patientIdWidget,{at: 0});
		this.formElements.add(flowIdWidget,{at: 1});
		this.formElements.add(formIdWidget,{at: 2}); 
		//this.formElements.add(createdWidget,{at: 2}); 
		//thisHtml = this.template(this.model.toJSON());
		thisHtml = this.template(this.form.toJSON());
		$(this.el).html(thisHtml);
		this.formElements.each(this.addOne);
    if (FORMY.sessionRecord.actionTakens.length > 0) {
      actionTakens = FORMY.sessionRecord.actionTakens
    } else {
      actionTakens = null;
    }
    FORMY.sessionRecord.actionTakens.each(this.addActionTaken);
		return this;
	},
  //recordSaved: false,
  currentParentName: "formElements",
  currentParent: $(this.currentParentName),
  currentTableName: "",
  currentRow:0,
  formElements: null,
  currentForm: null,
  actionTakens: null,
  addActionTaken: function(record) {
    if ((record.attributes.type != null) && (record.attributes.type === "actionTaken")) {
      var view = new ActionTakenListItemView({model: record});
      //this.rendered = this.view.render().el;
      console.log("add one in RecordView:" + JSON.stringify(record));
      this.$("#actionTakenList").append(view.render().el);
    } else {
      console.log("Skipping this record - not an actionTaken.")
    }
  },
  addOne: function(formElement){
//		console.log("add one:" + JSON.stringify(formElement));
    var inputType = formElement.get("inputType");
    var datatype = formElement.get("datatype");
    var closeRow = formElement.get("closeRow");
    var identifier = formElement.get("identifier");
    var tblCols = formElement.get("cols");
    var size = formElement.get("size");
    var colspan = formElement.get("colspan");
    this.value = this.model.get(identifier);
    if (inputType == 'display-actionTakenLink') {
      formElement.set({"value": this.model.get("_id")});
    }
    // don't count the hidden widgets at the beginning of the form.
    if ((inputType !== "hidden") && (datatype !== "display")) {
      this.currentRow ++;
    }
    //console.log("currentRow: " + this.currentRow + " identifier: " + identifier);
    if (this.value != null) {
      console.log("value for " + identifier + ": " + this.value);
      formElement.set({"value": this.value});
    }
    if (this.orientation === "vert") {
      tblCols = 2;
      if (closeRow === "false") {
        if (this.currentRow % 2) {
          closeRow = "false";
        } else {
          closeRow = "true";
          //console.log("Setting closeRow to true for " + identifier + " ; currentRow: " + this.currentRow);
        }
      }
      if (inputType == 'button') {
        closeRow = "true";
//				formElement.set({"width":"450"});
//				formElement.set({"colspan":"2"});
      } else if (inputType == 'text') {
        if (size > 25) {
          //console.log("Size: " + size);
          closeRow = "true";
          formElement.set({"colspan":"2"});
          if (size >= 50) {
            formElement.set({"size":"50"});
          }
        }
      } else if (inputType == 'textarea') {
        closeRow = "true";
        formElement.set({"colspan":"2"});
        formElement.set({"rows":"4"});
        formElement.set({"cols":"60"});
      } else {
        formElement.set({"colspan":colspan});
      }
    }
    if (tblCols == null) {
      if (this.orientation === "vert") {
        tblCols = 2;
      } else {
        tblCols = 3;
      }
    }
    var currentTableName = "#tblbeginTableIdentifier";
    //console.log("add one:" + JSON.stringify(formElement));
    if (inputType == 'display-tbl-begin') {
      template = displayTableWidgetCompiledHtml;
      html = template(formElement.toJSON());
      //$(this.$("#formElements")).append(html);
      $("#formElements").append(html);
      currentParentName = "#beginTableRow" + identifier;
      currentParent = $(currentParentName);
    } else if (inputType == 'display-tbl-end') {
    } else if (inputType == 'hidden-empty') {
      html = "<!-- " + identifier + " -->";
      $(this.$("#formElements")).append(html);
    } else if (inputType == 'hidden-preset') {
      html = "<!-- " + identifier + " -->";
      $(this.$("#formElements")).append(html);
    } else if (inputType == 'display-header') {
      formElement.set({"tblCols" : tblCols});
      currentParent.append((new RecordElementView({model: formElement})).render().el);
    } else if (inputType == 'hidden') {
      currentParentName = "#theForm";
      currentParent = $(currentParentName);
      closeRow = "false";
      $(this.$("#formElements")).append((new RecordElementView({model: formElement})).render().el);
      //console.log("Hidden Element: " + identifier + " currentParentName: " + currentParentName);
    } else if (inputType == 'alertCheckbox') {
      if (typeof this.value !== 'undefined') {
        currentParent.append((new RecordElementView({model: formElement})).render().el);
      }
    } else {
      currentParent.append((new RecordElementView({model: formElement})).render().el);
    }
    if (closeRow == "true") {
      //$("table").append("<tr id=\"row" + identifier + "\"></tr>");
      $(currentTableName).append("<tr id=\"row" + identifier + "\"></tr>");
      currentParentName = "#row" + identifier;
      currentParent = $(currentParentName);
      this.currentRow = 0;	//reset currentRow.
      //console.log("CloseRow currentParentName: " + currentParentName);
    }
//    if (currentTableName != null && $(currentTableName)) {
//      var currentTableNameHtml = $(currentTableName).html();
//      //console.log("currentTableNameHtml:" + currentTableNameHtml)
//    }
    //console.log("Element: " + identifier + " currentParentName: " + currentParentName);
  }
});

var ActionTakenListItemView = Backbone.View.extend({
  tagName : "tr",
  template: Handlebars.compile($("#actionTakenList-template").html()),

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

