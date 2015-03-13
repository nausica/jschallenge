'use strict';

/**
 * @ngdoc overview
 * @name jschallengeApp
 * @description
 * # jschallengeApp
 *
 * Main module of the application.
 */
angular

.module('jschallengeApp', [
	'ngRoute', 
	'controllers.main', 
	'controllers.availability'])

.config(['$routeProvider',
	function($routeProvider) {
    $routeProvider.
    	when('/', {
    		templateUrl: 'views/main.html',
    		controller: 'MainController'
    	}).
    	when('/availability', {
        	templateUrl: 'views/map.html',
        	controller: 'MapController'
      	}).
    	otherwise({
    		redirectTo: '/'
    	});
}]);