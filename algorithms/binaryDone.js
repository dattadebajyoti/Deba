//taking user input
var num=+process.argv[2];
var number = num;

var result = [];
var nibble=[];
//log to convert decimal input into binary
while(number >= 1 )
{
  result.unshift(Math.floor(number%2));
  number = number/2;
}
//showing the binary representation
console.log(result);
var first=0;
// var arr=[3,4,5];
// console.log(arr);
//finding the total number of bits
var last=result.length;
console.log(last)
var middle = Math.round(first+(last-first)/2);

var middle = parseInt(result.length / 2);
//storing the corresponding left and right parts into left and right
var left   = result.slice(0, middle);
var right  = result.slice(middle, result.length);

//storing the left part in the right of nibble and right part in the left of nibble
while (right.length)
    nibble.push(right.shift());

while (left.length)
    nibble.push(left.shift());

console.log("the whole nibble after swaping right and left parts is: "+nibble);
var total=0;
var j=0;
//calculating the decimal value of nibble
for(var i=nibble.length-1;i>=0;i--)
{
  total=total+nibble[j]*Math.pow(2,i);
  j++;
  //console.log(total);
}
console.log("decimal value of the sorted nibble is "+total);
