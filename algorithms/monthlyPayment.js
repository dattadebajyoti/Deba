var p=+process.argv[2];
var y=+process.argv[3];
var r1=+process.argv[3];
var n=12*y;
var r=r1/1200;
var payment=Math.ceil(p*r/(1-(Math.pow((1+r),-n))));
console.log(payment);
