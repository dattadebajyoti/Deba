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
console.log(last);
var middle = Math.round(first+(last-first)/2);
console.log(middle);
