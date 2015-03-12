'use strict';
angular.module("mapsModule", ['uiGmapgoogle-maps'])

.value("rndAddToLatLon", function () {
	return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
})

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
	GoogleMapApi.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
}])


.controller("MapController",['$scope', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi',
		function ($scope, $timeout, $log, $http, rndAddToLatLon, GoogleMapApi) {

	GoogleMapApi.then(function(maps) {
		$scope.googleVersion = maps.version;
		maps.visualRefresh = true;
		$scope.map = {
			center: {
        		latitude: 45,
        		longitude: -73
      		},
      		zoom: 3,
      		dragging: true,
      		bounds : {},
      		events : {},
      		options: {},
      		control: {},
      		show: true
		}
		console.log('controller')
		console.log($scope.googleVersion)
	});
	
}]);