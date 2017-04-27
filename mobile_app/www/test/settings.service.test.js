describe('Settings service tests', function() {
	var mockResource;
    var mockTimeout;
    var mockInterval;
    var mockLocation;
    var mockSettings;

    beforeEach(function() {
        module(function($provide) {
            $provide.service('$interval', function() {
                this.cancel = jasmine.createSpy('cancel');
            })
        });
        module('core.settings')
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

    it('should cancel the timer', function() {
        mockSettings.cancelInterval(function() {});
        expect(mockInterval.cancel).toHaveBeenCalled();
    });

    it('should set an interval', function() {
        //expect(mockSettings.interval(() => {}, 1000,1).then).toBeDefined();
    });

    it('should set a sleep timer', function() {
        expect(mockSettings.sleep(() => {}, 1000).then).toBeDefined();
    })
});
