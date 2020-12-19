sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/todo/util/HTTPRequestHelper" 
], function(Controller, JSONModel, HTTPRequestHelper) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.Book", {

		onInit: function() {
			this.oModel = new JSONModel();
			this.getView().setModel(this.oModel);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.getRoute("book").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			this._getBook(oArgs.bookId);
		},

		_getBook: function(bookId) {
			HTTPRequestHelper.doGet(
				"books",  
				this._handleGetBookResponse.bind(this),
				bookId
			);
		},

		_handleGetBookResponse: function(res) {
			this.oModel = new JSONModel(res);
			this.getView().setModel(this.oModel, "Book");
			this.getView().getModel().refresh();
		}
	});
});
