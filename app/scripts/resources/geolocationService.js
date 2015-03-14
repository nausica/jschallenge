'use strict';

angular.module('resources.geolocation', [])
	.service('GeolocationService', [
		'$q',
		'$rootScope',
		'$window', function ($q, $rootScope, $window) {
    return {
		getLocation: function () {
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