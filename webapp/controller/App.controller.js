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
			this.oModel = new JSONModel();
			this.getView().setModel(this.oModel);

			this._getBooks();
		},

		_getBooks: function() {
			HTTPRequestHelper.doGet(
				"books",  
				this._handleGetBooksResponse.bind(this)
			);
		},

		_handleGetBooksResponse: function(res) {
			this.oModel = new JSONModel({"Books": res});
			this._refreshModel();
		},

		_onAddPress: function() {

			this.oModel.getData().Books.push(newBook);
			this._refreshModel();
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
