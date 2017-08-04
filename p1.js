var buildMultiplier=function(x)	{
  return function(y){
		     return x*y;
		    }
}
var double= buildMultiplier(2);
var triple= buildMultiplier(3);

console.log(double(3));
console.log(triple(3));
