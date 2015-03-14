'use strict';
angular.module("controllers.availability", [
	'uiGmapgoogle-maps',
	'resources.availability',
	'resources.geolocation',
	'resources.message',
	'providers.google.distancematrix'])

.value("rndAddToLatLon", function () {
	return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
})

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
	GoogleMapApi.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
}])
.controller('InfoController', function ($scope) {
	$scope.templateValue = 'hello from the template itself';
	$scope.clickedButtonInWindow = function () {
		var msg = 'clicked a window in the template!';
		alert(msg);
	}
})
.controller('MapController',[
	'$scope',
	'$routeParams', 
	'$timeout', 
	'rndAddToLatLon',
	'uiGmapGoogleMapApi',
	'AvailabilityService',
	'GeolocationService',
	'MessageService',
	'GoogleDistanceMatrix',
	function ($scope, $routeParams, $timeout, rndAddToLatLon, GoogleMapApi, AvailabilityService, GeolocationService, MessageService, GoogleDistanceMatrix) {

		// Get location from browser and render initial map
		GeolocationService
			.getLocation()
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
			});
			
			// Subscribe to changes in search
			MessageService.subscribe('search', function(name, parameters){
				console.log(parameters)
				$scope.refreshMap(parameters);
			});

			// Refresh map with availability and get distances from Directions API
			$scope.refreshMap = function(params) {

				var buildCoordPaar = function(obj) { return obj.latitude + ',' + obj.longitude; };
				var origin = buildCoordPaar( $scope.location.coords );
				var destinations, args;

				// Empty markers
				$scope.markers = [];

				// Get Data from availability and directions
        		AvailabilityService
            		.getByDates(params.book_start, params.book_end)
            		.then( function( availables ) {
		                $scope.availables = availables;
		                destinations = _.map(availables, buildCoordPaar)
		                				//.join('|');
						//return DirectionsService.getDistanceMatrix(origin, destinations);
						args = {
							origins: [origin],
							destinations: destinations
						};
						
						return GoogleDistanceMatrix.getDistanceMatrix(args)
					})
					.then( function (distanceMatrix) {
						console.log(distanceMatrix);
						$scope.distanceMatrix = distanceMatrix;
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
											},
											distance: $scope.distanceMatrix.rows[0].elements[index].distance.text
										}
									}
								}
							};
							$scope.map.markers.push(m);
						});
					})
			};
}]);