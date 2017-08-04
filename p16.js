function readArray()
{
  var a=document.getElementById("i1").value;
  var b=document.getElementById("i2").value;
  var c=document.getElementById("i3").value;
  var root1;
  var root2;
  var real_part;
  var imaginary_part;
  var determinant=Math.pow(b,2)-4*a*c;
  if(determinant>0)
  {
    root1=(-b+Math.sqrt(determinant))/(2*a);
    root2=(-b-Math.sqrt(determinant))/(2*a);
    document.write("root1: "+root1);
    document.write("root2: "+root2);
  }
  else if (determinant == 0)
    {
        root1 = root2 = -b/(2*a);
        document.write("root1: "+root1+" root2: "+root2);
    }
  else
    {
        real_part=-b/(2*a);
        imaginary_part=-Math.sqrt(determinant)/2*a;
        document.write("real_part: "+real_part);
        document.write("imaginary_part: "+imaginary_part);
    }

}
