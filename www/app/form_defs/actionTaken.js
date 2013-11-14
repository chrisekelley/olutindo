var actionTakenForm = {
  "_id": "actionTaken",
  "id": "actionTaken",
  "formId":"actionTaken",
  "type":"actionTaken",
  "formBuilder": "FormDesignerAlpha",
  "label": "Action Taken",
  "flow": {
    "id": 300,
    "name": "auto",
    "flowOrder": 1
  },
  "form_elements": [
    {
      "label": "BEGIN TABLE ",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "display",
      "visible": "true",
      "closeRow": "false",
      "colspan": "null",
      "size": "null",
      "rows": "null",
      "cols": "2",
      "identifier": "beginTableIdentifier",
      "inputType": "display-tbl-begin"
    },
    {
      "label": "Type of Action",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "display",
      "visible": "true",
      "closeRow": "true",
      "colspan": "2",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "display_action_type",
      "inputType": "display-header"
    },
    {
      "label": "Initial Assignment",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "boolean",
      "visible": "true",
      "closeRow": "false",
      "colspan": "1",
      "valign": "bottom",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "initial_assignment",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Followup",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "boolean",
      "visible": "true",
      "closeRow": "false",
      "colspan": "1",
      "valign": "bottom",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "followup",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Phone Call with Citizen",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "boolean",
      "visible": "true",
      "closeRow": "false",
      "colspan": "1",
      "valign": "bottom",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "phonecall",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Resolved",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "boolean",
      "visible": "true",
      "closeRow": "true",
      "colspan": "1",
      "valign": "bottom",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "resolved",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Comments",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "string",
      "visible": "true",
      "closeRow": "false",
      "colspan": "2",
      "size": "0",
      "rows": "6",
      "cols": "38",
      "identifier": "comment",
      "inputType": "textarea"
    },
    {
      "label": "Save",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "display",
      "visible": "true",
      "closeRow": "true",
      "colspan": "2",
      "width": "300px",
      "height": "50px",
      "rows": "0",
      "cols": "0",
      "identifier": "form-save",
      "inputType": "button"
    },
    {
      "label": "END TABLE",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "display",
      "visible": "true",
      "closeRow": "false",
      "colspan": "null",
      "size": "null",
      "rows": "null",
      "cols": "null",
      "identifier": "endTableIdentifier",
      "inputType": "display-tbl-end"
    }
  ],
  "collection": "form"
};