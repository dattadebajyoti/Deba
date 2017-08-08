var c=+process.argv[2];
var t=c;
var epsilon=1e-15;
while(Math.abs(t-c/t)>epsilon*t)
{
   t = (c/t + t) / 2.0;
}
console.log(t);
