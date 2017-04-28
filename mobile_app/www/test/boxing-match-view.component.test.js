describe('Combination component tests', function() {
	var mockCombination;
    var mockSpeech;
    var mockSettings;
    var $componentController;
    var httpBackend;

    beforeEach(function() {
        module('core');
        module('boxingMatchView')
    });

	beforeEach(inject(function($httpBackend, Settings, Combination, Speech) {
        httpBackend = $httpBackend;
		mockCombination = Combination;
        mockSpeech = Speech;
        mockSettings = Settings;
	}));

    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('when entering ring button is pushed then ', function() {
        var ctrl;
        beforeEach(function() {
            ctrl = $componentController('boxingMatchView');
            httpBackend.expectGET('dist/combinations.json').respond([{}, {}, {}]);
            ctrl.$onInit();
            httpBackend.flush();
        });

        it('the punch image should not be shown', function() {
            expect(ctrl.showPunchImg).toBe(false);
        });

        it('the combos should be loaded', function() {
            expect(ctrl.combos.length).toBe(3);
        });
    });
});
