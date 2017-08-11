function isPrime(k)
{
var flag = 0;
for (j = 2; j <= k / 2; j++) {
      if (k % j == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      return true;

    }
}
var c=0;
var myArray=new Array(10);
var arr=new Array(1000);
for(var i=0; i<10; i++)
{
  myArray[i]=new Array(10);
}
for(i=2; i<1000; i++)
{
  if(isPrime(i)==true)
  {
    arr[i]=i;
    c++;
  }
}

//console.log(arr);
var x=0;
var a=0;
var b=100;
for(var i = 0; i < 10; i++) //prompt user for input and fill the array
{
  myArray[i][0]="range of "+a+" to "+b;
  //console.log(myArray[i][0]);
  a=a+100;
  b=b+100;
    for(var j = 1; j < 100;j++)
    {
        myArray[i][j]=(arr[x]);
        x++;
    }
}

for(i=0;i<10;i++)
{
  for(j=0;j<100;j++)
  {
    if(myArray[i][j]!=null)
    console.log(myArray[i][j]);
  }
  console.log("____________________");
}
