var m=+process.argv[2];
var d=+process.argv[3];
var y=+process.argv[4];
var y0=y-(14-m)/12;
var x=y0+y0/4-y0/100+y0/400;
var m0=m+12*((14-m)/12)-2;
var d0=(d+x+31*m0/12)%7;
console.log(Math.round(d0));
