describe('Settings service tests', function() {
	var mockResource;
    var mockTimeout;
    var mockInterval;
    var mockLocation;
    var mockSettings;

    beforeEach(function() {
        module(function($provide) {
            //$provide.factory
        });
        module('core.settings');
    });

	beforeEach(inject(function($resource, $timeout, $interval, $location, Settings) {
		mockResource = $resource;
        mockTimeout = $timeout;
        mockInterval = $interval;
        mockLocation = $location;
        mockSettings = Settings;
	}));

	it('should set round time', function() {
		mockSettings.setRoundTime(1000);
        expect(mockSettings.getRoundTime()).toBe(1000);
	});
});
