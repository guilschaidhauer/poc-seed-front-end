sap.ui.define([
	"require", 
	"sap/ui/demo/todo/util/URLProvider"
], function(require, URLProvider) {
	"use strict";
	return {
		doGet: function(path, headers, successCallback, detail = "") {
			var completeUrl = URLProvider.getDestination() + path;
			if (detail !== "") completeUrl = completeUrl + "/" + detail;

			$.ajax({
				type: "GET",
				crossDomain: true,
				url: completeUrl,
				headers: headers,
				contentType: "application/json",
				success: function (res, status, xhr) {
					successCallback(res, status, xhr);	
				},
				error: function (jqXHR, textStatus, errorThrown) {
				  console.log("Got an error response: " + textStatus + errorThrown);
				}
			});
		}
	};
});