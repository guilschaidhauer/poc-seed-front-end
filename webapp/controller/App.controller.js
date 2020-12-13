sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel", 
	"sap/ui/model/odata/ODataModel",
	"sap/ui/demo/todo/util/HTTPRequestHelper"
], function(Device, Controller, Filter, FilterOperator, JSONModel, ODataModel, HTTPRequestHelper) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		onInit: function() {

			this.oModel = new JSONModel({"Books": [
				{
					"id": 1,
					"name": "Harry Potter",
					"description": "A nice book",
					"price": 99
				},
				{
					"id": 2,
					"name": "Harry Potter 2",
					"description": "A nice book",
					"price": 99
				}
			]});

			this.getView().setModel(this.oModel);
		},

		_onAddPress: function() {
			var newBook = {
				id: 2,
				name: "Book", 
				description: "test",
				price: 99
			};

			HTTPRequestHelper.doGet("books", this._callBackFunction);

			this.oModel.getData().Books.push(newBook);
			this._refreshModel();
		},

		_onDeletePress: function(oEvent) {

		},

		_refreshModel: function() {
			this.getView().setModel(this.oModel);
			this.getView().getModel().refresh();
		},

		_callBackFunction: function(res) {
			console.log(res);
		},
	});

});
