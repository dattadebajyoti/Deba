var m=+process.argv[2];
var d=+process.argv[3];
var y=+process.argv[4];
var y0=Math.floor(y-(14-m)/12);
var x=Math.floor(y0+y0/4-y0/100+y0/400);
var m0=Math.floor(m+12*((14-m)/12)-2);
var d0=Math.floor((d+x+31*m0/12)%7);
console.log("the weekday is: "+Math.round(d0));
