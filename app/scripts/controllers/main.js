'use strict';

/**
 * @ngdoc function
 * @name jschallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jschallengeApp
 */
angular.module('controllers',[
	'ui.bootstrap'])

.controller('MainController', function($scope, $http) {

	// Query for a booking in 1 day from now, for 2 hours.
	var start = Date.now() + 24 * 3600 * 1000;
	var end = start + 2 * 3600 * 1000;
	var url = 'http://api1.shubacca.com/provider/1/availability?book_start=' + start + '&book_end=' + end;
	$scope.awesomeThings = [1,2,3];
	$http.get(url).success(function(result) {
		console.log('Result from the API call:', result);
	}).error(function(err) {
		// Hum, this is odd ... contact us...
		console.error(err);
	});
})
.controller('DateTimepickerController', function($scope) {
	$scope.mytime = new Date();
	$scope.hstep = 1;
	$scope.mstep = 15;
});