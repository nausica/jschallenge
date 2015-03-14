'use strict';


describe('Controller: DatetimePickerController', function () {
	// load the controller's module
	beforeEach(module('controllers.main'));
	beforeEach(function() {
        module('resources.message');
    });

	var DatetimePickerController,
		scope,
		service;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, MessageService) {
		scope = $rootScope.$new();
		DatetimePickerController = $controller('DatetimePickerController', {
			$scope: scope
		});
		
		service = MessageService;
	}));

	it('should initialize pickup/return date/time', function () {
		expect(scope.pickupTime).not.toBe(null);
		expect(scope.returnTime).not.toBe(null);
		expect(scope.pickupDate).not.toBe(null);
		expect(scope.returnDate).not.toBe(null);
	});

	it('submit should call the messageService with search', function() {
    	spyOn(service, 'publish');
    	scope.submit();
    	expect(service.publish).toHaveBeenCalled;
    	
	});
});
