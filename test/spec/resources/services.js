'use strict';

describe('service tests', function (){
	var 
		mService,
        aService,
        gService,
        rootScope;
	
	// excuted before each "it" is run.
	beforeEach(function (){
		
		// load the modules.
		module('resources.geolocation');
		module('resources.message');
		module('resources.availability');
		
		// inject the service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function($rootScope, _GeolocationService_, _MessageService_, _AvailabilityService_) {
			gService = _GeolocationService_;
			mService = _MessageService_;
			aService = _AvailabilityService_;

			rootScope = $rootScope.$new;
		});
	});
		 
	// check to see if it has the expected services
	it('should have a geolocation function', function () { 
		expect(angular.isFunction(gService.getLocation)).toBe(true);
	});
	it('should have a geolocation function', function () { 
		expect(angular.isFunction(mService.publish)).toBe(true);
	});
	it('should have a geolocation function', function () { 
		expect(angular.isFunction(mService.subscribe)).toBe(true);
	});
	it('should have a geolocation function', function () { 
		expect(angular.isFunction(aService.getByDates)).toBe(true);
	});
	

});
