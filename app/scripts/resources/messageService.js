
"use strict";

angular.module('resources.message', [])
	.service('MessageService', function ($rootScope) {
		var self = this;

		self.publish = function(name, parameters) {
			parameters.timeStamp = Date.now();
			$rootScope.$broadcast(name, parameters);
		}

		self.subscribe = function(name, listener) {
			$rootScope.$on(name, listener);
		}
	});
