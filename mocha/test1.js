var assert = require('assert');

var calc = require('./calc.js');


describe('Calculator Tests', function() {
	it('returns 1+1=2', function(done) {
		assert.equal(calc.add(1, 1), 2);
		done();
	});

	it('returns 2*2=4', function(done) {
		assert.equal(calc.mul(2, 2), 4);
		done();
	});
});
