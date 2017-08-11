var oneD1=[];
var oneD2=[];
var oneD3=[];
var Arr1=[];
for(var l=0;l<10;l++)
{
    Arr1[l]=new Array(100);
}

var Arr2=[];
for(l=0;l<10;l++)
{
    Arr2[l]=new Array(100);
}




var arr = [];
var arr2 = [];
prime_start_end(0, 1000);

function prime_start_end(s, e) {
  var start = s;
  var end = e;
  var flag = 0;
  for (i = start; i <= end; i++) {
    flag = 0;
    for (j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      arr.push(i);
    }
  }
}
var size = arr.length;
anagram(arr, size);
var x, y;
// var m=0;
// var n=0;

function anagram(arr, size) {
  var flag;
  for (i = 0; i < size; i++) {
    //oneD2.push(arr[i]);
    if (arr[i] > 10) {
      var no1 = arr[i];
      var a = Math.floor(no1 / 10);
      var b = no1 - a * 10;
      for (j = i + 1; j < size; j++) {

        var no2 = arr[j];
        var c = Math.floor(no2 / 10);
        var d = no2 - c * 10;
        if (a == d && b == c) {

          console.log(no2 + " is a anagram of " + no1);
          oneD1.push(no1);
          oneD1.push(no2);

          break;

        } else {
          continue;
        }
      }

    }
    if (arr[i] > 100) {
      var no1 = arr[i];
      var a = Math.floor(no1 / 100);
      var b = no1 - a * 100;
      var c = Math.floor(b / 10);
      var d = b - c * 10;
      for (j = i + 1; j < size; j++) {

        var no2 = arr[j];
        var e = Math.floor(no2 / 100);
        var f = no2 - e * 100;
        var g = Math.floor(f / 10);
        var h = f - g * 10;
        arr2.push(e);
        arr2.push(g);
        arr2.push(h);
        arr2.sort();

        var a1 = arr2[0];
        var a2 = arr2[1];
        var a3 = arr2[2];
        arr2 = [];
        if ((a == a1) && (c == a2) && (d == a3)) {
          console.log(no2 + " is a anagram of " + no1);
          oneD1.push(no1);
          oneD1.push(no2);

          break;
        } else {
          continue;
        }
      }
    }

    //oneD2.push(arr[i]);
}

  // console.log(arr[i]);
}

console.log(oneD1);
console.log("_________________");
// var y=0;
// for(i=0;i<arr.length;i++)
// {
//   for(j=0;j<oneD1.length;j++)
//   {
//      if(arr[i]!=oneD1[j])
//        break;
//      else
//        oneD2.push(arr[j]);
//    }
// }

for(i=0;i<arr.length;i++)
{
  for(j=0;j<oneD1.length;j++)
  {
    if(arr[i]==oneD1[j])
    {
      delete arr[i];
    }
  }
}

for(i=0;i<arr.length;i++)
{
  if(arr[i]!=null)
  {
    console.log(arr[i]);
  }
}










var t=0;
for(i=0;i<10;i++)
{
  for(j=0;j<10;j++)
  {
    Arr1[i][j]=oneD1[t];
    t++;
  }
}
console.log("storing the anagrams in 2D array");
for(i=0;i<10;i++)
{
  for(j=0;j<10;j++)
  {
    if(Arr1[i][j]!=null)
    console.log(Arr1[i][j]);
  }
}
console.log("Storing the prime numbers that are not anagram");
var u=0;
for(i=0;i<10;i++)
{
  for(j=0;j<100;j++)
  {
    Arr2[i][j]=arr[u];
    u++;
  }
}
console.log("storing the numbers that are not anagrams in 2D array");
for(i=0;i<10;i++)
{
  for(j=0;j<100;j++)
  {
    if(Arr2[i][j]!=null)
    console.log(Arr2[i][j]);
  }
}
