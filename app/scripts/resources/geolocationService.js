'use strict';

angular.module('resources.geolocation', [])
	.service('GeolocationService', [
		'$q',
		'$rootScope',
		'$window',
		'$timeout', function ($q, $rootScope, $window, $timeout) {
    return {
		getLocation: function (opts) {
			var deferred = $q.defer();
				if ($window.navigator && $window.navigator.geolocation) {
					$window.navigator.geolocation.getCurrentPosition( function(position) {
						deferred.resolve(position);
					});
				}
			return deferred.promise;
		}
	};
 }]);