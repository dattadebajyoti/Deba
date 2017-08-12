var m=+process.argv[2];
var y=+process.argv[3];
var y0 = Math.floor(y+4800-((14-m)/12));
var x = Math.floor(y0+y0/4-y0/100 + y0/400);
var m0 = Math.floor(m + 12 * ((14 - m) / 12)-3);
var day=Math.floor((2+((153 *(m0)+ 2) / 5)+ (365 * x)- 32045));
day=day%7;
console.log(day);
var weekDay={
  0:"sun",
  1:"mon",
  2:"tue",
  3:"wed",
  4:"thu",
  5:"fri",
  6:"sat"
}
var month={
  1:31,
  2:28,
  3:31,
  4:30,
  5:31,
  6:30,
  7:31,
  8:31,
  9:30,
  10:31,
  11:30,
  12:31
}
var monthDay={
  1:"january",
  2:"february",
  3:"march",
  4:"april",
  5:"may",
  6:"june",
  7:"july",
  8:"august",
  9:"september",
  10:"october",
  11:"november",
  12:"december",
}
var monthInput=monthDay[m];
var noOfWeeks=Math.floor(month[m]/7);
var totalWeeks=noOfWeeks+1;
console.log(totalWeeks);
var calendar2d=new Array(7);

for(var i=0; i<7; i++)
{
  calendar2d[i]=new Array(7);
}
console.log("Calendar for given month: "+monthDay[m]+" and year: "+y+" is as follows");
var start=1;
for(var j=0;j<7;j++)
{
  calendar2d[0][j]=" "+weekDay[j];
}
for(i=1; i<7; i++)
{

  for(j=0; j<7; j++)
  {
    if(j<day)
    {
      calendar2d[i][j]=" "+" "+" "+" ";
    }
    else {
      if((start<=month[m]))
      {
        if(start<=9)
        {
        calendar2d[i][j]=" "+" "+" "+start;
        }
        else {
          calendar2d[i][j]=" "+" "+start;
        }
        start++;
      }
      else {
        calendar2d[i][j]=" "+" "+" "+" ";
      }
    }
  }
  day=0;
}
console.log(calendar2d);
