sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel", 
	"sap/ui/model/odata/ODataModel"
], function(Device, Controller, Filter, FilterOperator, JSONModel, ODataModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		onInit: function() {
			var oModel = new JSONModel({"Books": [
				{
					"Name": "Notebook Basic 15",
					"Quantity": 10
				},
				{
					"Name": "Notebook Basic 17",
					"Quantity": 20
				},
				{
					"Name": "Notebook Basic 18",
					"Quantity": 10
				}
			]});

			this.getView().setModel(oModel);
		},

	});

});
