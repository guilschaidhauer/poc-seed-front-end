sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/core/ComponentSupport"], function(UIComponent) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.todo.Component", {
		metadata: {
			manifest: "json"
		},

		init : function () {


			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},
	});
});
