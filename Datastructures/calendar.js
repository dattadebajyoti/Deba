
var m=+process.argv[2];
var d=+process.argv[3];
var y=+process.argv[4];
var y0=Math.floor(y-(14-m)/12);
var x=Math.floor(y0+y0/4-y0/100+y0/400);
var m0=Math.floor(m+12*((14-m)/12)-2);
var d0=Math.floor((d+x+31*m0/12)%7);
//console.log(Math.round(d0));

var arr1=new Array(6);
for(var i=0;i<7;i++)
{
  arr1[i]=new Array(7);
}
var monthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
var monthName=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
var s=[];

var arr2=["sun","mon","tue","wed","thu","fri","sat"];
for(i=0;i<12;i++)
{

  if(m==i)
  {
    console.log(" This month is: "+monthName[i-1]);
    console.log("          ");
    break;
  }
}
var totDays;
for(i=1;i<=12;i++)
{
  if(i==m)
  {
    totDays=monthDays[i-1];
    console.log("total days are: "+totDays);
    break;
  }
}

console.log("sun"+" "+" "+"mon"+" "+" "+"tue"+" "+" "+"wed"+" "+" "+"thu"+" "+" "+"fri"+" "+" "+"sat");

var store=new Array(6);
for(i=0;i<6;i++)
{
  store[i]=new Array(7);
}
countDay=1;
for(i=0;i<6;i++)
{
  for(j=0;j<7;j++)
  {
    store[i][j]=" "+countDay;
  }
  console.log(store);
}
