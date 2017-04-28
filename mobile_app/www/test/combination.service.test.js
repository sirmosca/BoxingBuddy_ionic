describe('Combination service tests', function() {

    var sut, _inject, httpBackend;

    sut = null;
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
        sut = Combination
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
            expect(!!sut).toBe(true);
        });

        it('returns a list of combinations', function() {
            var combinations;
            httpBackend.expectGET('dist/combinations.json').respond([{}, {}, {}]);
            
            combinations = sut.query();
            httpBackend.flush();
            
            expect(combinations.length).toBe(3);
        });
    });
});