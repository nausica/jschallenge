'use strict';
angular.module("controllers.availability", [
	'uiGmapgoogle-maps',
	'resources.availability',
	'resources.geolocation'])

.value("rndAddToLatLon", function () {
	return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
})

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
	GoogleMapApi.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
}])
.controller('InfoController', function ($scope, $log) {
	$scope.templateValue = 'hello from the template itself';
	$scope.clickedButtonInWindow = function () {
		var msg = 'clicked a window in the template!';
		$log.info(msg);
		alert(msg);
	}
})
.controller("MapController",[
	'$scope',
	'$routeParams', 
	'$timeout', 
	'uiGmapLogger', 
	'$http', 
	'rndAddToLatLon',
	'uiGmapGoogleMapApi',
	'AvailabilityService',
	'GeolocationService',
	function ($scope, $routeParams, $timeout, $log, $http, rndAddToLatLon, GoogleMapApi, AvailabilityService, GeolocationService) {

        AvailabilityService
            .getByDates($routeParams.book_start, $routeParams.book_end)
            .then( function( availables )
            {
                $scope.availables = availables;
                console.log(availables);
                return GeolocationService.getLocation(); 
            })
            .then( function( location )
            {
                $scope.location = location;
                console.log(location);
                return GoogleMapApi;
            })
            .then( function( maps )
            {
                $scope.googleVersion = maps.version;
				maps.visualRefresh = true;
				$scope.map = {
					center: {
						latitude: $scope.location ? $scope.location.coords.latitude : 1,
						longitude: $scope.location ? $scope.location.coords.longitude : -73
					},
					zoom: 12,
					dragging: true,
					bounds : {},
					options: {},
					control: {},
					show: true,
					markers: [],
					clickedMarker: {
						id: 0,
						options:{}
					},
					events: {
						click: function (mapModel, eventName, originalEventArgs) {
							console.log("user defined event: " + eventName, mapModel, originalEventArgs);

							var e = originalEventArgs[0];
							var lat = e.latLng.lat();
							var lon = e.latLng.lng();

							$scope.map.clickedMarker = {
								id: 0,
								options: {
									labelContent: 'You clicked here ' + 'lat: ' + lat + ' long: ' + lon,
									labelClass: "marker-labels",
									labelAnchor: "50 0"
								},
								latitude: lat,
								longitude: lon
							};
							//scope apply required because this event handler is outside of the angular domain
							$scope.$apply();
						}
					}
				};

				// Render availability markers
				_.each($scope.availables, function (available, index) {
					var m = {
						id : index,
						latitude: available.latitude,
						longitude: available.longitude,
						showWindow: false,
						windowLabel: available.parking_name,
						templatedInfoWindow: {
							options: {
								disableAutoPan: true
							},
							show: true,
							templateUrl: 'views/markerInfo.html',
							templateParameter: {
								message: {
									title: available.parking_name,
									cars_available: available.cars_available,
									position: {
										lat: available.latitude,
										lon: available.longitude
									},
									user_position: {
										lat: $scope.location.coords.latitude,
										lon: $scope.location.coords.longitude
									}
								}
							}
						}
					};
					$scope.map.markers.push(m);

				});
			});
}]);