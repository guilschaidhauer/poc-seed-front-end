sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel", 
	"sap/ui/demo/todo/util/HTTPRequestHelper",
	"sap/ui/core/routing/History"
], function(Controller, JSONModel, HTTPRequestHelper, History) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.NewBook", {

		onInit: function() {
			this.oModel = new JSONModel({});
			this.getView().setModel(this.oModel);

			this.nameInput = this.byId("name");
			this.descriptionInput = this.byId("description");
			this.priceInput = this.byId("price");
		},

		_onSavePress: function() {
			var bookName = this.nameInput.getValue();
			var bookDescription = this.descriptionInput.getValue();
			var bookPrice = this.priceInput.getValue();

			var book = {
				name: bookName,
				description: bookDescription.getValue,
				price: bookPrice
			}

			HTTPRequestHelper.doPost(
				"books",
				book, 
				this._onSaveSuccess.bind(this)
			);
		},

		_onSaveSuccess: function(res) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("app");
			}
		},

		_refreshModel: function() {
			this.getView().setModel(this.oModel);
			this.getView().getModel().refresh();
		}

	});

});
