describe('My Function', function() {
	var t;

	beforeEach(function() {
		t = true;
	});

	afterEach(function() {
		t = null;
	});

	it('should perform action 1', function() {
		expect(t).toBeTruthy();
	});
});
