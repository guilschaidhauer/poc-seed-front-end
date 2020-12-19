sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/todo/util/HTTPRequestHelper",
	"sap/ui/core/Fragment" 
], function(Controller, JSONModel, HTTPRequestHelper, Fragment) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.Book", {

		onInit: function() {
			this.oModel = new JSONModel();
			this.getView().setModel(this.oModel);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.getRoute("book").attachMatched(this._onRouteMatched, this);

			this._formFragments = {};

			// Set the initial form to be the display one
			this._showFormFragment("Display");
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

		_onEditPress : function () {
			//Clone the data
			this._oBook = Object.assign({}, this.getView().getModel().getData());
			this._toggleButtonsAndView(true);
		},

		_onSavePress : function () {
			this._toggleButtonsAndView(false);
		},

		_onCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			//oData.SupplierCollection[0] = this._oSupplier;

			//oModel.setData(oData);
			this._toggleButtonsAndView(false);
		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_handleGetBookResponse: function(res) {
			this.oModel = new JSONModel(res);
			this.getView().setModel(this.oModel, "Book");
			this.getView().getModel().refresh();
			this.byId('edit').setEnabled(true);
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "sap.ui.demo.todo.view.fragments." + sFragmentName
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}

			return pFormFragment;
		},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			this._getFormFragment(sFragmentName).then(function(oVBox){
				oPage.insertContent(oVBox);
			});
		}
	});
});
