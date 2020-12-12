sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel", 
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.Book", {

		onInit: function() {
			this.oModel = new JSONModel({});

			this.getView().setModel(this.oModel);
		},

		_refreshModel: function() {
			this.getView().setModel(this.oModel);
			this.getView().getModel().refresh();
		}

	});

});
