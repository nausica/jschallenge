'use strict';

angular.module('resources.availability', [])
	.service('AvailabilityService', ['$q', '$http', function($q, $http) {
		return {
			getByDates: function(start, end) {
				var deferred = $q.defer();
				var url = 'http://api1.shubacca.com/provider/1/availability?book_start=' + start + '&book_end=' + end;

				$http.get(url).success(function(availables) {
					deferred.resolve(availables);
				});
 
				return deferred.promise;
			}
		};
	}]);