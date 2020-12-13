sap.ui.define([
	"require", 
	"sap/ui/demo/todo/util/URLProvider"
], function(require, URLProvider) {
	"use strict";
	return {
		doGet: function(path, successCallback) {
			$.ajax({
				type: "GET",
				//data: "{}",
				crossDomain: true,
				url: URLProvider.getDestination() + path,
				headers: {'key1':'value1','key2':'value2'},
				contentType: "application/json",
				success: function (res, status, xhr) {
					successCallback(res);	
					console.log(URLProvider.getDestination());
				},
				error: function (jqXHR, textStatus, errorThrown) {
				  console.log("Got an error response: " + textStatus + errorThrown);
				}
			  });
		}
	};
});
