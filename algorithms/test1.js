var num=+process.argv[2];
var number = num;
var result = [];
while(number >= 1 )
{
  result.unshift(Math.floor(number%2));
  number = number/2;
}
console.log(result);
var first=0;
var arr=[3,4,5];
var last=arr.length;

var middle = Math.round(first+(last-first)/2);

var middle = parseInt(result.length / 2);
var left   = result.slice(0, middle);
var right  = result.slice(middle, result.length);

var result1=[];
while (right.length)
    result1.push(right.shift());

while (left.length)
    result1.push(left.shift());

console.log(result1);
var total=0;
var j=0;
for(var i=result1.length-1;i>=0;i--)
{
  total=total+result1[j]*Math.pow(2,i);
  j++;
  console.log(total);
}
console.log(total);
