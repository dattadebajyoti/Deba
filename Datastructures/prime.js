//function to check whether a number is prime
var c = 0;
var x = 0;
//a and b  are the variables used for the range of 100 where a is the start and b is the end
var a = 0;
var b = 100;

function isPrime(k) {
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
//creating  a 2D array
var myArray = new Array(10);
var arr = new Array(1000);
for (var i = 0; i < 10; i++) {
  myArray[i] = new Array(10);
}
//checking for prime between 2 and 1000 and storing it into the 2D array
for (i = 2; i < 1000; i++) {
  if (isPrime(i) == true) {
    arr[i] = i;
    c++;
  }
}

//console.log(arr);

//storing the prime numbers in a range of 100
for (var i = 0; i < 10; i++) {
  myArray[i][0] = "range of " + a + " to " + b;
  //console.log(myArray[i][0]);
  a = a + 100;
  b = b + 100;
  for (var j = 1; j < 100; j++) {
    myArray[i][j] = (arr[x]);
    x++;
  }
}

//function to print all the prime number within a range of 100
for (i = 0; i < 10; i++) {
  for (j = 0; j < 100; j++) {
    if (myArray[i][j] != null)
      console.log(myArray[i][j]);
  }
  console.log("____________________");
}
