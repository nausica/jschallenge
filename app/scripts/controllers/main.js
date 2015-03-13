'use strict';

/**
 * @ngdoc function
 * @name jschallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jschallengeApp
 */
angular.module('controllers.main',[
	'ui.bootstrap'])

.controller('MainController', function($scope, $http) {

	// Query for a booking in 1 day from now, for 2 hours.
	var start = Date.now() + 24 * 3600 * 1000;
	var end = start + 2 * 3600 * 1000;
	var url = 'http://api1.shubacca.com/provider/1/availability?book_start=' + start + '&book_end=' + end;
	$scope.awesomeThings = [1,2,3];
	/*
	$http.get(url).success(function(result) {
		console.log('Result from the API call:', result);
	}).error(function(err) {
		// Hum, this is odd ... contact us...
		console.error(err);
	});
*/
})
.controller('DatetimePickerController', function($scope, $location) {
	
	// Datepicker
	$scope.pickupDate = new Date();
	$scope.returnDate = new Date();
	$scope.minPickupDate = new Date();
	$scope.dpOpened = {
		pickupOpened: false,
		returnOpened: false
	};
	$scope.open = function($event, opened) {
    	$event.preventDefault();
    	$event.stopPropagation();

    	$scope.dpOpened[opened] = true;
  	};

  	// TimePicker
	$scope.pickupTime = new Date();
	$scope.returnTime = new Date();
	$scope.hstep = 1;
	$scope.mstep = 30;

  	// Submit Search
  	$scope.submit = function(isValid) {
  		// Check validity of the params
  		if (isValid) {
  			
  			// Merge Date/Time objects
  			$scope.pickupTime.setDate($scope.pickupDate.getDate());
  			$scope.pickupTime.setMonth($scope.pickupDate.getMonth());
  			$scope.pickupTime.setFullYear($scope.pickupDate.getFullYear());

  			$scope.returnTime.setDate($scope.returnDate.getDate());
  			$scope.returnTime.setMonth($scope.returnDate.getMonth());
  			$scope.returnTime.setFullYear($scope.returnDate.getFullYear());
			
			$location.path('/availability')
				.search({
					book_start: $scope.pickupTime.getTime(),
					book_end: $scope.returnTime.getTime()
				})
			
		}	
  	};
});