describe('Combination service tests', function() {

    var mockCombination, _inject, httpBackend;

    mockCombination = null;
    httpBackend = null;


    beforeEach(function() {
        module('core.combination')
    });

    // _inject = function() {
    //     inject(function(Combination, $httpBackend) {
    //         Combination = Combination;
    //         httpBackend = $httpBackend;
    //     });
    // };

    beforeEach(inject(function($httpBackend, Combination) {
        httpBackend = $httpBackend;
        mockCombination = Combination
    }));
    
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('the Combination resource', function() {
        beforeEach(function() {
            //_inject();
        });

        it('exists', function() {
            expect(!!mockCombination).toBe(true);
        });

        it('returns a list of combinations', function() {
            var combinations;
            httpBackend.expectGET('dist/combinations.json').respond([{}, {}, {}]);
            
            combinations = mockCombination.query();
            httpBackend.flush();
            
            expect(combinations.length).toBe(3);
        });
    });
});