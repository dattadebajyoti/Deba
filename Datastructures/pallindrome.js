// var isPalindrome = function (str) {return str === str.split('').reverse().join('');}
// var t=isPalindrome("madam");
// if(t)
// console.log("it is pallindrome");
// else
// console.log("not pallindrome");
var check1=process.argv.slice(2);
var check=check1.toString("UTF8");
var array=check.split('');
console.log(array);
var SIZE=array.length;
var queue=new Array(SIZE);
var F = -1;
var R = -1;

function insert_r(x)
{
if(F == (R+1)%SIZE)
{
console.log("Queue Overflow");
}
else if(R == -1)
{
F = 0;
R = 0;
queue[R] = x;
}
else
{
R = (R+1) %SIZE;
queue[R] = x;
}
return queue[R];
}

function insert_f(x)
{
if(F == (R+1)%SIZE)
{
console.log("Queue Overflow");
}
else if(R == -1)
{
F = 0;
R = 0;
queue[R] = x;
}
else
{
F = (F+SIZE-1) %SIZE;
queue[F] = x;
}
return queue[F];
}

function delete_r()
{
 //console.log(R);
var x;
if(F == -1)
{
console.log("Queue Underflow");
}
else if(F == R)
{
x = queue[F];
queue[F]=null;
F = -1;
R = -1;
}
else
{
x = queue[R];
queue[R]=null;
R = R-1;
}
  //console.log(R);
return x;
}

function delete_f()
{
var x;
if(F == -1)
{
console.log("Queue Underflow");
}
else if(F == R)
{
x = queue[F];
F = -1;
R = -1;
}
else
{
x = queue[F];
queue[F]=null;
F = F+1;
}
return x;
}

function display()
{
  for(var j=F;j<=R;j++)
  {
    console.log(queue[j]);
  }
}

for(var k=0;k<array.length;k++)
{
  console.log(insert_r(array[k]));
  count++;
}
// console.log(insert_r("k"));
// console.log(insert_f("l"));

console.log("________________________");
//delete_r();
//delete_f();
//display();

var count=0;
while(F<SIZE && R>-1)
{
  if(queue[F]==array[R])
  {
    count++;
    F++;
    R--;
  }
  else {
    break;
  }
}
if(count==array.length)
console.log("it is a pallindrome");
else
console.log("It is not a pallindrome");
