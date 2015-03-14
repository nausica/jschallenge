'use strict';

/**
 * @ngdoc function
 * @name jschallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jschallengeApp
 */
angular.module('controllers.main',[
	'ui.bootstrap',
	'resources.message'])

.controller('MainController', function($scope, $http) {
	
})
.controller('HeaderController', function($scope, $http) {
	$scope.isCollapsed = false;


	$scope.submitSuggestion = function() {
		// This is actually doing nothing, but it'd be a nice feature.
		// Although maybe you have it already!
		alert('Your suggestion will be considered!');
	}
})

.controller('DatetimePickerController', 
	function($scope, $location, MessageService) {
	
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
			
			/*
			$location.path('/availability')
				.search({
					book_start: $scope.pickupTime.getTime(),
					book_end: $scope.returnTime.getTime()
				})
			*/
			MessageService.publish("search", {
				book_start: $scope.pickupTime.getTime(), 
				book_end: $scope.returnTime.getTime()
			});
		}	
  	};
});