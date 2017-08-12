var week={
  0:"sunday",
  1:"monday",
  2:"tuesday",
  3:"wednesday",
  4:"thursday",
  5:"friday",
  6:"saturday"
}
// month array has the no of days for each month that has
var month={
  1:31,
  2:28,
  3:30,
  4:31,
  5:30,
  6:31,
  7:31,
  8:31,
  9:30,
  10:31,
  11:30,
  12:31
}
//month array with respective month details
var monthExp={
  1:"jan",
  2:"feb",
  3:"mar",
  4:"apr",
  5:"may",
  6:"jun",
  7:"jul",
  8:"aug",
  9:"sept",
  10:"oct",
  11:"nov",
  12:"dec"
}

var m=+process.argv[2]; //reading the month from the user
var y=+process.argv[3]; //reading the year from the user
var y0 = Math.floor(y+4800-((14-m)/12));
var x = Math.floor(y0+y0/4-y0/100 + y0/400);
var m0 = Math.floor(m + 12 * ((14 - m) / 12)-3);
//calculating the day of which the month is going to be starts
var day=Math.floor((2+((153 *(m0)+ 2) / 5)+ (365 * x)- 32045));
day=day%7;
//for the array no of week of the month week is taken in an account
var dd=month[m];
var week=dd%7;
var weeks=week+1;
//creating a array with the 2d to display the calendar
var cal=new Array(weeks);

for(i=0; i<=weeks; i++)
{
  cal[i]=new Array(weeks);
}
var c=0;
var start=1;
console.log("javascript calender:"+m+" "+y)
console.log(""+monthExp[m]+" "+y);
console.log("      su    m    t     w     th    fr    sa ");
//creating the for loop store the weeks
for(var i=0; i<=weeks; i++)
{

  for(var j=0; j<7; j++)
  {
    if(j<day) //to print the space value here my space value= 0 is taken to display in proper manner
    {
      cal[i][j]=" 0";
    }
    else {
      if((start<=month[m]))
      {
        if(start<9) //to start the letters with single digit make it as two digit in calendar
        {
        cal[i][j]="0"+start;
        }
        else {
          cal[i][j]=""+start;
        }
        start++;
      }
    }

  }
  day=0;
}
//displaying the calendar  in a 2d array
console.log(cal);
