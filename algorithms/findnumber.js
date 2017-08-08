function find_number()
{
  var n1=document.getElementById("i1").value;
  var n=Math.round(Math.pow(2,n1));
  var result=guess(0,n)
//  if(result==0)
  document.write("Number found: "+result);
}
function guess(first,last)
{
  if ((last-first) == 1)
   return first;
  var mid=first+(last-first)/2;
  var t=parseInt(prompt("think of an number between 0 and "+(last-1)+"___"+"Is it less than "+mid+" or greater than"+mid+" or the number is found? 0 or 1 or -1"));
       if (t==1)
       return guess(mid, last);
       else if(t==0)
       return guess(first, mid);
       else
       return mid;
}
