//require the built in assertion library
var assert = require('assert');
//create a group test about array
describe('Array', function() {
  describe('#indexOf()', function() {
    //a string explanation of what we are testing
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
