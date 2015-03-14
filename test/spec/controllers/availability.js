'use strict';

describe('Controller: MapController', function () {
    var MapController,
        scope,
        mService,
        aService,
        gService,
        params = {
            bookStart: 1426407958988,
            bookEnd: 1426420558988
        },
        location = {
            cords:  {
            latitude: 1.3428841999999999,
            longitude: 103.96322819999999
            }
        }; 

    beforeEach(function (){
        // load the controller's module
        module('controllers.availability');
        module('resources.geolocation');
        module('resources.message');
        module('resources.availability');
        module(function($provide) {
            $provide.value('googleMaps', google.maps); 
        });

        // Initialize the controller and a mock scope
        inject(function (
            $controller, 
            $rootScope, 
            _MessageService_,
            GeolocationService,
            _AvailabilityService_
        ) {
            gService = GeolocationService;
            mService = _MessageService_;
            aService = _AvailabilityService_;
            scope = $rootScope.$new();
            MapController = $controller('MapController', {
                $scope: scope,
                $routeParams: {book_start: 1, book_end: 2}
            });
            
        });
    });

   
    it('init should call the geocationService', inject(function ($q) {
        var deferredSuccess = $q.defer();
        spyOn(gService, 'getLocation');

        deferredSuccess.resolve(location); 
        expect(scope.location).not.toBe(null);
    }));
    


    it('should call the availabilityService',  inject(function ($q) {
        var deferred = $q.defer();

        scope.markers = [];
        scope.availables = [];
        scope.location = {};
        scope.location.coords = {
            latitude: 1.3428841999999999,
            longitude: 103.96322819999999
        };

        spyOn(aService, 'getByDates').and.returnValue(deferred.promise); 
        scope.refreshMap(params);
        deferred.resolve(['test']);
        scope.$digest();

        expect(aService.getByDates).toHaveBeenCalled();
        expect(scope.availables[0]).toBe('test');
    }));
    

});
