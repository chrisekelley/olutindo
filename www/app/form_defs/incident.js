var incidentForm = {
  "_id": "incident",
  "id": "incident",
  "formId":"incident",
  "type":"incident",
  "formBuilder": "FormDesignerAlpha",
  "label": "Incident Report",
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
      "label": "Phone",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "string",
      "visible": "true",
      "closeRow": "true",
      "colspan": "2",
      "size": "10",
      "rows": "0",
      "cols": "0",
      "identifier": "phone",
      "inputType": "text"
    },
    {
      "label": "SMS Message",
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
      "cols": "36",
      "identifier": "description",
      "inputType": "textarea"
    },
    {
      "label": "Sub-county",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "int",
      "visible": "true",
      "closeRow": "true",
      "colspan": "2",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "subcounty",
      "inputType": "selectCascadeParent",
      "enumerations": [
        {
          "name": "Item",
          "tagName": "item",
          "label": "Kayonza",
          "labelItextID": "Kayonza",
          "defaultValue": "1"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Kitimbwa",
          "labelItextID": "Kitimbwa",
          "defaultValue": "2"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Bbaale",
          "labelItextID": "Bbaale",
          "defaultValue": "3"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Galiraya",
          "labelItextID": "Galiraya",
          "defaultValue": "4"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Kayunga",
          "labelItextID": "Kayunga",
          "defaultValue": "5"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Busaana",
          "labelItextID": "Busaana",
          "defaultValue": "6"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Nazigo",
          "labelItextID": "Nazigo",
          "defaultValue": "7"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Kangulumira",
          "labelItextID": "Kangulumira",
          "defaultValue": "8"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Kayunga Town Council",
          "labelItextID": "Kayunga Town Council",
          "defaultValue": "9"
        }
      ]
    },
    {
      "label": "Village",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "int",
      "visible": "true",
      "closeRow": "true",
      "colspan": "2",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "village",
      "class": "village",
      "inputType": "selectCascadeChild",
      "enumerations": [
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bugatto",
          "labelItextID": "Bugatto",
          "defaultValue":"1",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bugonya A",
          "labelItextID": "Bugonya A",
          "defaultValue":"2",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bugonya B",
          "labelItextID": "Bugonya B",
          "defaultValue":"3",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nsiima",
          "labelItextID": "Nsiima",
          "defaultValue":"4",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kamusabi",
          "labelItextID": "Kamusabi",
          "defaultValue":"5",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kasolokamponye",
          "labelItextID": "Kasolokamponye",
          "defaultValue":"6",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiganda",
          "labelItextID": "Kiganda",
          "defaultValue":"7",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Lugasa West",
          "labelItextID": "Lugasa West",
          "defaultValue":"8",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Lukonda",
          "labelItextID": "Lukonda",
          "defaultValue":"9",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nsanvu",
          "labelItextID": "Nsanvu",
          "defaultValue":"10",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wabunyonyi",
          "labelItextID": "Wabunyonyi",
          "defaultValue":"11",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakyesa I",
          "labelItextID": "Nakyesa I",
          "defaultValue":"12",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakyeasa Ii",
          "labelItextID": "Nakyeasa Ii",
          "defaultValue":"13",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakyesa Iii",
          "labelItextID": "Nakyesa Iii",
          "defaultValue":"14",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakyeasa Iv",
          "labelItextID": "Nakyeasa Iv",
          "defaultValue":"15",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namatogonya I",
          "labelItextID": "Namatogonya I",
          "defaultValue":"16",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namatogonya Ii",
          "labelItextID": "Namatogonya Ii",
          "defaultValue":"17",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namatogonya Iii",
          "labelItextID": "Namatogonya Iii",
          "defaultValue":"18",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namatogonya Iv",
          "labelItextID": "Namatogonya Iv",
          "defaultValue":"19",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bukerere",
          "labelItextID": "Bukerere",
          "defaultValue":"20",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kakiika A",
          "labelItextID": "Kakiika A",
          "defaultValue":"21",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kakiika B",
          "labelItextID": "Kakiika B",
          "defaultValue":"22",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kaligoya",
          "labelItextID": "Kaligoya",
          "defaultValue":"23",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kirintoogo",
          "labelItextID": "Kirintoogo",
          "defaultValue":"24",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakyesanja",
          "labelItextID": "Nakyesanja",
          "defaultValue":"25",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namanoga",
          "labelItextID": "Namanoga",
          "defaultValue":"26",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nsungwe",
          "labelItextID": "Nsungwe",
          "defaultValue":"27",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Katuugo",
          "labelItextID": "Katuugo",
          "defaultValue":"28",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kazinga",
          "labelItextID": "Kazinga",
          "defaultValue":"29",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiddukulu",
          "labelItextID": "Kiddukulu",
          "defaultValue":"30",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiseeta A",
          "labelItextID": "Kiseeta A",
          "defaultValue":"31",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiseeta B",
          "labelItextID": "Kiseeta B",
          "defaultValue":"32",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitwe East",
          "labelItextID": "Kitwe East",
          "defaultValue":"33",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Takajunge",
          "labelItextID": "Takajunge",
          "defaultValue":"34",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wunga",
          "labelItextID": "Wunga",
          "defaultValue":"35",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kawolokota West",
          "labelItextID": "Kawolokota West",
          "defaultValue":"36",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kayonza",
          "labelItextID": "Kayonza",
          "defaultValue":"37",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyatto I",
          "labelItextID": "Kyatto I",
          "defaultValue":"38",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyatto Ii",
          "labelItextID": "Kyatto Ii",
          "defaultValue":"39",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyatto Iii",
          "labelItextID": "Kyatto Iii",
          "defaultValue":"40",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Luagsa East",
          "labelItextID": "Luagsa East",
          "defaultValue":"41",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Makukulu",
          "labelItextID": "Makukulu",
          "defaultValue":"42",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakabango",
          "labelItextID": "Nakabango",
          "defaultValue":"43",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namaliri",
          "labelItextID": "Namaliri",
          "defaultValue":"44",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bukomba",
          "labelItextID": "Bukomba",
          "defaultValue":"45",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kafumba",
          "labelItextID": "Kafumba",
          "defaultValue":"46",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kakooge",
          "labelItextID": "Kakooge",
          "defaultValue":"47",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiwuna",
          "labelItextID": "Kiwuna",
          "defaultValue":"48",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nawankonge",
          "labelItextID": "Nawankonge",
          "defaultValue":"49",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nyondo A",
          "labelItextID": "Nyondo A",
          "defaultValue":"50",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nyondo B",
          "labelItextID": "Nyondo B",
          "defaultValue":"51",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bujwaya",
          "labelItextID": "Bujwaya",
          "defaultValue":"52",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kawolokota East",
          "labelItextID": "Kawolokota East",
          "defaultValue":"53",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namavundu",
          "labelItextID": "Namavundu",
          "defaultValue":"54",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namizo A",
          "labelItextID": "Namizo A",
          "defaultValue":"55",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namizo B",
          "labelItextID": "Namizo B",
          "defaultValue":"56",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nawansama",
          "labelItextID": "Nawansama",
          "defaultValue":"57",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bugoma",
          "labelItextID": "Bugoma",
          "defaultValue":"58",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Busabira",
          "labelItextID": "Busabira",
          "defaultValue":"59",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyaato",
          "labelItextID": "Kyaato",
          "defaultValue":"60",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyamugongo A",
          "labelItextID": "Kyamugongo A",
          "defaultValue":"61",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyamugongo B",
          "labelItextID": "Kyamugongo B",
          "defaultValue":"62",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyamujumba",
          "labelItextID": "Kyamujumba",
          "defaultValue":"63",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Salama",
          "labelItextID": "Salama",
          "defaultValue":"64",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Balisanga",
          "labelItextID": "Balisanga",
          "defaultValue":"65",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kabalangajja",
          "labelItextID": "Kabalangajja",
          "defaultValue":"66",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kikwatambogo",
          "labelItextID": "Kikwatambogo",
          "defaultValue":"67",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kirisiru",
          "labelItextID": "Kirisiru",
          "defaultValue":"68",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Matigi",
          "labelItextID": "Matigi",
          "defaultValue":"69",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nabusanja",
          "labelItextID": "Nabusanja",
          "defaultValue":"70",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nkokonjeru",
          "labelItextID": "Nkokonjeru",
          "defaultValue":"71",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nsambya",
          "labelItextID": "Nsambya",
          "defaultValue":"72",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nzingu",
          "labelItextID": "Nzingu",
          "defaultValue":"73",
          "parent": "subcounty",
          "parent_id":1
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bulawula A",
          "labelItextID": "Bulawula A",
          "defaultValue":"74",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bulawula B",
          "labelItextID": "Bulawula B",
          "defaultValue":"75",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bulawula C",
          "labelItextID": "Bulawula C",
          "defaultValue":"76",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nkokonjeruya",
          "labelItextID": "Nkokonjeruya",
          "defaultValue":"77",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nkokonjeru B",
          "labelItextID": "Nkokonjeru B",
          "defaultValue":"78",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Tweyagalire",
          "labelItextID": "Tweyagalire",
          "defaultValue":"79",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bweramondo",
          "labelItextID": "Bweramondo",
          "defaultValue":"80",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kigalama",
          "labelItextID": "Kigalama",
          "defaultValue":"81",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyerima A",
          "labelItextID": "Kyerima A",
          "defaultValue":"82",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyerima B",
          "labelItextID": "Kyerima B",
          "defaultValue":"83",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyerima C",
          "labelItextID": "Kyerima C",
          "defaultValue":"84",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mafumbe",
          "labelItextID": "Mafumbe",
          "defaultValue":"85",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mbulakati",
          "labelItextID": "Mbulakati",
          "defaultValue":"86",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nanjwenge",
          "labelItextID": "Nanjwenge",
          "defaultValue":"87",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakaseeta",
          "labelItextID": "Nakaseeta",
          "defaultValue":"88",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namabuga",
          "labelItextID": "Namabuga",
          "defaultValue":"89",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bisaka",
          "labelItextID": "Bisaka",
          "defaultValue":"90",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kabalira",
          "labelItextID": "Kabalira",
          "defaultValue":"91",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakivubo",
          "labelItextID": "Nakivubo",
          "defaultValue":"92",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakivubo B",
          "labelItextID": "Nakivubo B",
          "defaultValue":"93",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nongo -Nakivubo",
          "labelItextID": "Nongo -Nakivubo",
          "defaultValue":"94",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bugirinya",
          "labelItextID": "Bugirinya",
          "defaultValue":"95",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bwamiramira",
          "labelItextID": "Bwamiramira",
          "defaultValue":"96",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitatya A",
          "labelItextID": "Kitatya A",
          "defaultValue":"97",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitatya B",
          "labelItextID": "Kitatya B",
          "defaultValue":"98",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitatya C",
          "labelItextID": "Kitatya C",
          "defaultValue":"99",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kakoola",
          "labelItextID": "Kakoola",
          "defaultValue":"100",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kirimampokya A",
          "labelItextID": "Kirimampokya A",
          "defaultValue":"101",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kirimampokya B",
          "labelItextID": "Kirimampokya B",
          "defaultValue":"102",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wabuti",
          "labelItextID": "Wabuti",
          "defaultValue":"103",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wabwoko A",
          "labelItextID": "Wabwoko A",
          "defaultValue":"104",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wabwoko B",
          "labelItextID": "Wabwoko B",
          "defaultValue":"105",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiwuba",
          "labelItextID": "Kiwuba",
          "defaultValue":"106",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyebanja",
          "labelItextID": "Kyebanja",
          "defaultValue":"107",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mansa A",
          "labelItextID": "Mansa A",
          "defaultValue":"108",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mansa B",
          "labelItextID": "Mansa B",
          "defaultValue":"109",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namulaba",
          "labelItextID": "Namulaba",
          "defaultValue":"110",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namulaba",
          "labelItextID": "Namulaba",
          "defaultValue":"111",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nongo",
          "labelItextID": "Nongo",
          "defaultValue":"112",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wantete",
          "labelItextID": "Wantete",
          "defaultValue":"113",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Budada",
          "labelItextID": "Budada",
          "defaultValue":"114",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitimbwa Town",
          "labelItextID": "Kitimbwa Town",
          "defaultValue":"115",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitimbwa Village",
          "labelItextID": "Kitimbwa Village",
          "defaultValue":"116",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyatto",
          "labelItextID": "Kyatto",
          "defaultValue":"117",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyetume A",
          "labelItextID": "Kyetume A",
          "defaultValue":"118",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyetume B",
          "labelItextID": "Kyetume B",
          "defaultValue":"119",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyetume C",
          "labelItextID": "Kyetume C",
          "defaultValue":"120",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wabuyinja",
          "labelItextID": "Wabuyinja",
          "defaultValue":"121",
          "parent": "subcounty",
          "parent_id":2
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bbaale East",
          "labelItextID": "Bbaale East",
          "defaultValue":"122",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bbaale West",
          "labelItextID": "Bbaale West",
          "defaultValue":"123",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kanamugadu",
          "labelItextID": "Kanamugadu",
          "defaultValue":"124",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyasande",
          "labelItextID": "Kyasande",
          "defaultValue":"125",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mukondo",
          "labelItextID": "Mukondo",
          "defaultValue":"126",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namirembe",
          "labelItextID": "Namirembe",
          "defaultValue":"127",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Wabirumba",
          "labelItextID": "Wabirumba",
          "defaultValue":"128",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Gayaza",
          "labelItextID": "Gayaza",
          "defaultValue":"129",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mulaya",
          "labelItextID": "Mulaya",
          "defaultValue":"130",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Muluga",
          "labelItextID": "Muluga",
          "defaultValue":"131",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namataala",
          "labelItextID": "Namataala",
          "defaultValue":"132",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bugembo",
          "labelItextID": "Bugembo",
          "defaultValue":"133",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kokotero",
          "labelItextID": "Kokotero",
          "defaultValue":"134",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyakwambala",
          "labelItextID": "Kyakwambala",
          "defaultValue":"135",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Tangoye",
          "labelItextID": "Tangoye",
          "defaultValue":"136",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kabira",
          "labelItextID": "Kabira",
          "defaultValue":"137",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Misanga A",
          "labelItextID": "Misanga A",
          "defaultValue":"138",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Misanga B",
          "labelItextID": "Misanga B",
          "defaultValue":"139",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Misanga C",
          "labelItextID": "Misanga C",
          "defaultValue":"140",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nsube",
          "labelItextID": "Nsube",
          "defaultValue":"141",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Jiira",
          "labelItextID": "Jiira",
          "defaultValue":"142",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mugongo East",
          "labelItextID": "Mugongo East",
          "defaultValue":"143",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Mugongo West",
          "labelItextID": "Mugongo West",
          "defaultValue":"144",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kabaku",
          "labelItextID": "Kabaku",
          "defaultValue":"145",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Katuugo",
          "labelItextID": "Katuugo",
          "defaultValue":"146",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nabisubyaki",
          "labelItextID": "Nabisubyaki",
          "defaultValue":"147",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakitokolo",
          "labelItextID": "Nakitokolo",
          "defaultValue":"148",
          "parent": "subcounty",
          "parent_id":3
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Busungire",
          "labelItextID": "Busungire",
          "defaultValue":"149",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Galiraya",
          "labelItextID": "Galiraya",
          "defaultValue":"150",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kidibya A",
          "labelItextID": "Kidibya A",
          "defaultValue":"151",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kidibya B",
          "labelItextID": "Kidibya B",
          "defaultValue":"152",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiwula",
          "labelItextID": "Kiwula",
          "defaultValue":"153",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kasokwe A",
          "labelItextID": "Kasokwe A",
          "defaultValue":"154",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kasokwe B",
          "labelItextID": "Kasokwe B",
          "defaultValue":"155",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kilyola",
          "labelItextID": "Kilyola",
          "defaultValue":"156",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kirubo",
          "labelItextID": "Kirubo",
          "defaultValue":"157",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kirasa Central",
          "labelItextID": "Kirasa Central",
          "defaultValue":"158",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiwenda",
          "labelItextID": "Kiwenda",
          "defaultValue":"159",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kiyago",
          "labelItextID": "Kiyago",
          "defaultValue":"160",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Sobya",
          "labelItextID": "Sobya",
          "defaultValue":"161",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bweyale A",
          "labelItextID": "Bweyale A",
          "defaultValue":"162",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Bweyale B",
          "labelItextID": "Bweyale B",
          "defaultValue":"163",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kambatane",
          "labelItextID": "Kambatane",
          "defaultValue":"164",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kisugga A",
          "labelItextID": "Kisugga A",
          "defaultValue":"165",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kisugga B",
          "labelItextID": "Kisugga B",
          "defaultValue":"166",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kyedikyo",
          "labelItextID": "Kyedikyo",
          "defaultValue":"167",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Namalere",
          "labelItextID": "Namalere",
          "defaultValue":"168",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Baizo",
          "labelItextID": "Baizo",
          "defaultValue":"169",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Gweero",
          "labelItextID": "Gweero",
          "defaultValue":"170",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nabityanka",
          "labelItextID": "Nabityanka",
          "defaultValue":"171",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nakatuli",
          "labelItextID": "Nakatuli",
          "defaultValue":"172",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Nkutu",
          "labelItextID": "Nkutu",
          "defaultValue":"173",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Sokoso",
          "labelItextID": "Sokoso",
          "defaultValue":"174",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kalenge",
          "labelItextID": "Kalenge",
          "defaultValue":"175",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kawongo A",
          "labelItextID": "Kawongo A",
          "defaultValue":"176",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kawongo B",
          "labelItextID": "Kawongo B",
          "defaultValue":"177",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kikota ",
          "labelItextID": "Kikota ",
          "defaultValue":"178",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Kitwe",
          "labelItextID": "Kitwe",
          "defaultValue":"179",
          "parent": "subcounty",
          "parent_id":4
        },
        {
          "name": "Item",
          "tagName": "item",
          "label":"Misozi",
          "labelItextID": "Misozi",
          "defaultValue":"180",
          "parent": "subcounty",
          "parent_id":4
        },

        {
          "name": "Item",
          "tagName": "item",
          "label": "Butakoola",
          "labelItextID": "Butakoola",
          "defaultValue": "200",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bwetyaba",
          "labelItextID": "Bwetyaba",
          "defaultValue": "201",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Gaaza",
          "labelItextID": "Gaaza",
          "defaultValue": "202",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyambogo",
          "labelItextID": "Kyambogo",
          "defaultValue": "203",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyampisi",
          "labelItextID": "Kyampisi",
          "defaultValue": "204",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nawandagala",
          "labelItextID": "Nawandagala",
          "defaultValue": "205",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ndeeba",
          "labelItextID": "Ndeeba",
          "defaultValue": "206",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ntooke",
          "labelItextID": "Ntooke",
          "defaultValue": "207",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bubajjwe",
          "labelItextID": "Bubajjwe",
          "defaultValue": "208",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kaazi",
          "labelItextID": "Kaazi",
          "defaultValue": "209",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nalumuli",
          "labelItextID": "Nalumuli",
          "defaultValue": "210",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nalyamabidde",
          "labelItextID": "Nalyamabidde",
          "defaultValue": "211",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namatogonya",
          "labelItextID": "Namatogonya",
          "defaultValue": "212",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wajjanzi",
          "labelItextID": "Wajjanzi",
          "defaultValue": "213",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bulyankuyege",
          "labelItextID": "Bulyankuyege",
          "defaultValue": "214",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Buwungiro",
          "labelItextID": "Buwungiro",
          "defaultValue": "215",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Buyobe",
          "labelItextID": "Buyobe",
          "defaultValue": "216",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Gwanika",
          "labelItextID": "Gwanika",
          "defaultValue": "217",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kanjuki",
          "labelItextID": "Kanjuki",
          "defaultValue": "218",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kawuku",
          "labelItextID": "Kawuku",
          "defaultValue": "219",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyanika",
          "labelItextID": "Kyanika",
          "defaultValue": "220",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyanya",
          "labelItextID": "Kyanya",
          "defaultValue": "221",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Busaale",
          "labelItextID": "Busaale",
          "defaultValue": "222",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Katikamu",
          "labelItextID": "Katikamu",
          "defaultValue": "223",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kitto",
          "labelItextID": "Kitto",
          "defaultValue": "224",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyebanja",
          "labelItextID": "Kyebanja",
          "defaultValue": "225",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiryamuli",
          "labelItextID": "Kiryamuli",
          "defaultValue": "226",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kisombwa",
          "labelItextID": "Kisombwa",
          "defaultValue": "227",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakaseeta",
          "labelItextID": "Nakaseeta",
          "defaultValue": "228",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakaziba",
          "labelItextID": "Nakaziba",
          "defaultValue": "229",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wankyayiraki",
          "labelItextID": "Wankyayiraki",
          "defaultValue": "230",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bunyumya",
          "labelItextID": "Bunyumya",
          "defaultValue": "231",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiwooza",
          "labelItextID": "Kiwooza",
          "defaultValue": "232",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Mataba",
          "labelItextID": "Mataba",
          "defaultValue": "233",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namulanda",
          "labelItextID": "Namulanda",
          "defaultValue": "234",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Njala-Ebilese",
          "labelItextID": "Njala-Ebilese",
          "defaultValue": "235",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nsotoka",
          "labelItextID": "Nsotoka",
          "defaultValue": "236",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ssuuka",
          "labelItextID": "Ssuuka",
          "defaultValue": "237",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bugoge",
          "labelItextID": "Bugoge",
          "defaultValue": "238",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kagoye",
          "labelItextID": "Kagoye",
          "defaultValue": "239",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kisagazi",
          "labelItextID": "Kisagazi",
          "defaultValue": "240",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiteredde",
          "labelItextID": "Kiteredde",
          "defaultValue": "241",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wabigwo",
          "labelItextID": "Wabigwo",
          "defaultValue": "242",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukujju",
          "labelItextID": "Bukujju",
          "defaultValue": "243",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Busolo",
          "labelItextID": "Busolo",
          "defaultValue": "244",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiyagi",
          "labelItextID": "Kiyagi",
          "defaultValue": "245",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyamimbi",
          "labelItextID": "Kyamimbi",
          "defaultValue": "246",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nalweweta",
          "labelItextID": "Nalweweta",
          "defaultValue": "247",
          "parent": "subcounty",
          "parent_id": 5
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bugadu",
          "labelItextID": "Bugadu",
          "defaultValue": "248",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Busana",
          "labelItextID": "Busana",
          "defaultValue": "249",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kasana Ii",
          "labelItextID": "Kasana Ii",
          "defaultValue": "250",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Sababu ",
          "labelItextID": "Sababu ",
          "defaultValue": "251",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wabusonko",
          "labelItextID": "Wabusonko",
          "defaultValue": "252",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bakutta",
          "labelItextID": "Bakutta",
          "defaultValue": "253",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bunzibiridde",
          "labelItextID": "Bunzibiridde",
          "defaultValue": "254",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Busunsuli",
          "labelItextID": "Busunsuli",
          "defaultValue": "255",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kibuzi",
          "labelItextID": "Kibuzi",
          "defaultValue": "256",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kireku",
          "labelItextID": "Kireku",
          "defaultValue": "257",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kuffu",
          "labelItextID": "Kuffu",
          "defaultValue": "258",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyengera",
          "labelItextID": "Kyengera",
          "defaultValue": "259",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Lusenke",
          "labelItextID": "Lusenke",
          "defaultValue": "260",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namutya",
          "labelItextID": "Namutya",
          "defaultValue": "261",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kawuku",
          "labelItextID": "Kawuku",
          "defaultValue": "262",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namirembe",
          "labelItextID": "Namirembe",
          "defaultValue": "263",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wampologoma",
          "labelItextID": "Wampologoma",
          "defaultValue": "264",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namirember Ii",
          "labelItextID": "Namirember Ii",
          "defaultValue": "265",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kikuya",
          "labelItextID": "Kikuya",
          "defaultValue": "266",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bisaka",
          "labelItextID": "Bisaka",
          "defaultValue": "267",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Lusenke",
          "labelItextID": "Lusenke",
          "defaultValue": "268",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Masembe",
          "labelItextID": "Masembe",
          "defaultValue": "269",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namusaala",
          "labelItextID": "Namusaala",
          "defaultValue": "270",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namutya",
          "labelItextID": "Namutya",
          "defaultValue": "271",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Buyungirizi",
          "labelItextID": "Buyungirizi",
          "defaultValue": "272",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiwangula",
          "labelItextID": "Kiwangula",
          "defaultValue": "273",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakatovu",
          "labelItextID": "Nakatovu",
          "defaultValue": "274",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ngeye",
          "labelItextID": "Ngeye",
          "defaultValue": "275",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wantete",
          "labelItextID": "Wantete",
          "defaultValue": "276",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wampongo",
          "labelItextID": "Wampongo",
          "defaultValue": "277",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wantatte Gogwa",
          "labelItextID": "Wantatte Gogwa",
          "defaultValue": "278",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kasota",
          "labelItextID": "Kasota",
          "defaultValue": "279",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kayonjo",
          "labelItextID": "Kayonjo",
          "defaultValue": "280",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kitala",
          "labelItextID": "Kitala",
          "defaultValue": "281",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyayaye",
          "labelItextID": "Kyayaye",
          "defaultValue": "282",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyengera",
          "labelItextID": "Kyengera",
          "defaultValue": "283",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namukuma",
          "labelItextID": "Namukuma",
          "defaultValue": "284",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nangabo",
          "labelItextID": "Nangabo",
          "defaultValue": "285",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nanyuki",
          "labelItextID": "Nanyuki",
          "defaultValue": "286",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukungulu",
          "labelItextID": "Bukungulu",
          "defaultValue": "287",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kireku",
          "labelItextID": "Kireku",
          "defaultValue": "288",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakakandwa",
          "labelItextID": "Nakakandwa",
          "defaultValue": "289",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nampanyi",
          "labelItextID": "Nampanyi",
          "defaultValue": "290",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bumali",
          "labelItextID": "Bumali",
          "defaultValue": "291",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nabuganyi",
          "labelItextID": "Nabuganyi",
          "defaultValue": "292",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namatonya",
          "labelItextID": "Namatonya",
          "defaultValue": "293",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nekoyedde",
          "labelItextID": "Nekoyedde",
          "defaultValue": "294",
          "parent": "subcounty",
          "parent_id": 6
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Buguvu",
          "labelItextID": "Buguvu",
          "defaultValue": "295",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukamba A",
          "labelItextID": "Bukamba A",
          "defaultValue": "296",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukamba B",
          "labelItextID": "Bukamba B",
          "defaultValue": "297",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukamba Town",
          "labelItextID": "Bukamba Town",
          "defaultValue": "298",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Gayaza",
          "labelItextID": "Gayaza",
          "defaultValue": "299",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiswa",
          "labelItextID": "Kiswa",
          "defaultValue": "300",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namirembe",
          "labelItextID": "Namirembe",
          "defaultValue": "301",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Budoda",
          "labelItextID": "Budoda",
          "defaultValue": "302",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Katikanyonyi",
          "labelItextID": "Katikanyonyi",
          "defaultValue": "303",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiteredde",
          "labelItextID": "Kiteredde",
          "defaultValue": "304",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiwuba",
          "labelItextID": "Kiwuba",
          "defaultValue": "305",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakatooke",
          "labelItextID": "Nakatooke",
          "defaultValue": "306",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Gangama",
          "labelItextID": "Gangama",
          "defaultValue": "307",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kimanya",
          "labelItextID": "Kimanya",
          "defaultValue": "308",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kisoga",
          "labelItextID": "Kisoga",
          "defaultValue": "309",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiziika",
          "labelItextID": "Kiziika",
          "defaultValue": "310",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyetume",
          "labelItextID": "Kyetume",
          "defaultValue": "311",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ddamba",
          "labelItextID": "Ddamba",
          "defaultValue": "312",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kasega",
          "labelItextID": "Kasega",
          "defaultValue": "313",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kirindi",
          "labelItextID": "Kirindi",
          "defaultValue": "314",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakakonge",
          "labelItextID": "Nakakonge",
          "defaultValue": "315",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nsiima",
          "labelItextID": "Nsiima",
          "defaultValue": "316",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Zakaria",
          "labelItextID": "Zakaria",
          "defaultValue": "317",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Busagazi",
          "labelItextID": "Busagazi",
          "defaultValue": "318",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Gombolola Zone",
          "labelItextID": "Gombolola Zone",
          "defaultValue": "319",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kinyala Zone",
          "labelItextID": "Kinyala Zone",
          "defaultValue": "320",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiribedda",
          "labelItextID": "Kiribedda",
          "defaultValue": "321",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakatovu",
          "labelItextID": "Nakatovu",
          "defaultValue": "322",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nateeta",
          "labelItextID": "Nateeta",
          "defaultValue": "323",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nazigo",
          "labelItextID": "Nazigo",
          "defaultValue": "324",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kawonawo- Zone",
          "labelItextID": "Kawonawo- Zone",
          "defaultValue": "325",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Old Nazigo",
          "labelItextID": "Old Nazigo",
          "defaultValue": "326",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wabirongo",
          "labelItextID": "Wabirongo",
          "defaultValue": "327",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Church Hill",
          "labelItextID": "Church Hill",
          "defaultValue": "328",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kigobero",
          "labelItextID": "Kigobero",
          "defaultValue": "329",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kirimantungo",
          "labelItextID": "Kirimantungo",
          "defaultValue": "330",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kotwe",
          "labelItextID": "Kotwe",
          "defaultValue": "331",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyampisi",
          "labelItextID": "Kyampisi",
          "defaultValue": "332",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Magala",
          "labelItextID": "Magala",
          "defaultValue": "333",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakakonge",
          "labelItextID": "Nakakonge",
          "defaultValue": "334",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nazigo-Kiseveni",
          "labelItextID": "Nazigo-Kiseveni",
          "defaultValue": "335",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Senda",
          "labelItextID": "Senda",
          "defaultValue": "336",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiremezi A",
          "labelItextID": "Kiremezi A",
          "defaultValue": "337",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiremezi B",
          "labelItextID": "Kiremezi B",
          "defaultValue": "338",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kotwe",
          "labelItextID": "Kotwe",
          "defaultValue": "339",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nazigo",
          "labelItextID": "Nazigo",
          "defaultValue": "340",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nazigo Headquarters",
          "labelItextID": "Nazigo Headquarters",
          "defaultValue": "341",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Salaama",
          "labelItextID": "Salaama",
          "defaultValue": "342",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Sporta",
          "labelItextID": "Sporta",
          "defaultValue": "343",
          "parent": "subcounty",
          "parent_id": 7
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kalagala",
          "labelItextID": "Kalagala",
          "defaultValue": "344",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kangulumira",
          "labelItextID": "Kangulumira",
          "defaultValue": "345",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kasambya",
          "labelItextID": "Kasambya",
          "defaultValue": "346",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kitabazi",
          "labelItextID": "Kitabazi",
          "defaultValue": "347",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiwalasi",
          "labelItextID": "Kiwalasi",
          "defaultValue": "348",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kiwugu",
          "labelItextID": "Kiwugu",
          "defaultValue": "349",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Soona",
          "labelItextID": "Soona",
          "defaultValue": "350",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukeeka",
          "labelItextID": "Bukeeka",
          "defaultValue": "351",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kawomya",
          "labelItextID": "Kawomya",
          "defaultValue": "352",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kungu",
          "labelItextID": "Kungu",
          "defaultValue": "353",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Maligita",
          "labelItextID": "Maligita",
          "defaultValue": "354",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Mirembe",
          "labelItextID": "Mirembe",
          "defaultValue": "355",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kamira",
          "labelItextID": "Kamira",
          "defaultValue": "356",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kigayaza",
          "labelItextID": "Kigayaza",
          "defaultValue": "357",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kitambuza",
          "labelItextID": "Kitambuza",
          "defaultValue": "358",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakatundu",
          "labelItextID": "Nakatundu",
          "defaultValue": "359",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kibetu",
          "labelItextID": "Kibetu",
          "defaultValue": "360",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kikwanya",
          "labelItextID": "Kikwanya",
          "defaultValue": "361",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kimooli",
          "labelItextID": "Kimooli",
          "defaultValue": "362",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kireku",
          "labelItextID": "Kireku",
          "defaultValue": "363",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kizawula",
          "labelItextID": "Kizawula",
          "defaultValue": "364",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyabakadde",
          "labelItextID": "Kyabakadde",
          "defaultValue": "365",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Mayaga",
          "labelItextID": "Mayaga",
          "defaultValue": "366",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kamuli",
          "labelItextID": "Kamuli",
          "defaultValue": "367",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kisega",
          "labelItextID": "Kisega",
          "defaultValue": "368",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Mbulakati",
          "labelItextID": "Mbulakati",
          "defaultValue": "369",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Mpumudde",
          "labelItextID": "Mpumudde",
          "defaultValue": "370",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nnongo",
          "labelItextID": "Nnongo",
          "defaultValue": "371",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Rwanda",
          "labelItextID": "Rwanda",
          "defaultValue": "372",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wabukwa",
          "labelItextID": "Wabukwa",
          "defaultValue": "373",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Bukasa",
          "labelItextID": "Bukasa",
          "defaultValue": "374",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kayunga",
          "labelItextID": "Kayunga",
          "defaultValue": "375",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakirubi ",
          "labelItextID": "Nakirubi ",
          "defaultValue": "376",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namakandwa",
          "labelItextID": "Namakandwa",
          "defaultValue": "377",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nyiize",
          "labelItextID": "Nyiize",
          "defaultValue": "378",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Seeta",
          "labelItextID": "Seeta",
          "defaultValue": "379",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wantayi",
          "labelItextID": "Wantayi",
          "defaultValue": "380",
          "parent": "subcounty",
          "parent_id": 8
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Asoni-Kaggwa",
          "labelItextID": "Asoni-Kaggwa",
          "defaultValue": "381",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kakowekowe",
          "labelItextID": "Kakowekowe",
          "defaultValue": "382",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kamunye",
          "labelItextID": "Kamunye",
          "defaultValue": "383",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ndeeba",
          "labelItextID": "Ndeeba",
          "defaultValue": "384",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Sajjabi",
          "labelItextID": "Sajjabi",
          "defaultValue": "385",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kayunga Central",
          "labelItextID": "Kayunga Central",
          "defaultValue": "386",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kayunga North",
          "labelItextID": "Kayunga North",
          "defaultValue": "387",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kayunga West",
          "labelItextID": "Kayunga West",
          "defaultValue": "388",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kisawo-Kibira",
          "labelItextID": "Kisawo-Kibira",
          "defaultValue": "389",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kisaaba",
          "labelItextID": "Kisaaba",
          "defaultValue": "390",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namagabi A",
          "labelItextID": "Namagabi A",
          "defaultValue": "391",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Namagabi B",
          "labelItextID": "Namagabi B",
          "defaultValue": "392",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Wanyanga",
          "labelItextID": "Wanyanga",
          "defaultValue": "393",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Kyambogo",
          "labelItextID": "Kyambogo",
          "defaultValue": "394",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Nakaliro",
          "labelItextID": "Nakaliro",
          "defaultValue": "395",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ntenjeru A",
          "labelItextID": "Ntenjeru A",
          "defaultValue": "396",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Ntenjeru B",
          "labelItextID": "Ntenjeru B",
          "defaultValue": "397",
          "parent": "subcounty",
          "parent_id": 9
        }, {
          "name": "Item",
          "tagName": "item",
          "label": "Tente",
          "labelItextID": "Tente",
          "defaultValue": "398",
          "parent": "subcounty",
          "parent_id": 9
        }
      ]
    },
    {
      "label": "Priority",
      "value": "",
      "options": [
        {
          "name": "optional",
          "value": "true"
        }
      ],
      "datatype": "int",
      "visible": "true",
      "closeRow": "true",
      "colspan": "2",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "priority",
      "inputType": "selectFDA",
      "enumerations": [
        {
          "name": "Item",
          "tagName": "item",
          "label": "Low",
          "labelItextID": "Low",
          "defaultValue": "1"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "Medium",
          "labelItextID": "Medium",
          "defaultValue": "2"
        },
        {
          "name": "Item",
          "tagName": "item",
          "label": "High",
          "labelItextID": "High",
          "defaultValue": "3"
        }

      ]
    },
//    {
//      "label": "Department",
//      "value": "",
//      "options": [
//        {
//          "name": "optional",
//          "value": "true"
//        }
//      ],
//      "datatype": "int",
//      "visible": "true",
//      "closeRow": "true",
//      "colspan": "2",
//      "size": "0",
//      "rows": "0",
//      "cols": "0",
//      "identifier": "department",
//      "inputType": "selectFDA",
//      "enumerations": [
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Administration",
//          "labelItextID": "Administration",
//          "defaultValue": "1"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Finance and Planning",
//          "labelItextID": "Finance and Planning",
//          "defaultValue": "2"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Education",
//          "labelItextID": "Education",
//          "defaultValue": "3"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Health",
//          "labelItextID": "Health",
//          "defaultValue": "4"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Works",
//          "labelItextID": "Works",
//          "defaultValue": "5"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Council",
//          "labelItextID": "Council",
//          "defaultValue": "6"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Production",
//          "labelItextID": "Production",
//          "defaultValue": "7"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Community development",
//          "labelItextID": "Community development",
//          "defaultValue": "8"
//        },
//        {
//          "name": "Item",
//          "tagName": "item",
//          "label": "Natural resources",
//          "labelItextID": "Natural resources",
//          "defaultValue": "9"
//        }
//      ]
//    },

    {
      "label": "Department",
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
      "identifier": "display_departments",
      "inputType": "display-header"
    },
    {
      "label": "Admin",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dep_administration",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Community development",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dep_community_development",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Council",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_council",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Education",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_education",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Finance and Planning",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_finance",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Health",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_health",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Natural Resources",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_nat_resources",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Production",
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
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_production",
      "inputType": "alertCheckbox"
    },
    {
      "label": "Works",
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
      "colspan": "2",
      "size": "0",
      "rows": "0",
      "cols": "0",
      "identifier": "dev_works",
      "inputType": "alertCheckbox"
    },
//    {
//      "label": "Action Taken Link",
//      "value": "",
//      "options": [
//        {
//          "name": "optional",
//          "value": "true"
//        }
//      ],
//      "datatype": "display",
//      "visible": "true",
//      "closeRow": "true",
//      "colspan": "2",
//      "size": "0",
//      "rows": "0",
//      "cols": "0",
//      "identifier": "display_actionTaken",
//      "inputType": "display-actionTakenLink"
//    },
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