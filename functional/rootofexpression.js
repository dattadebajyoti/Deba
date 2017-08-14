function findroot()
{
  //take the values of a,b,c into the varaibles a,b,c
  var a=document.getElementById("i1").value;
  var b=document.getElementById("i2").value;
  var c=document.getElementById("i3").value;
  //declare variable to store roots,real part and the imaginary part
  var root1;
  var root2;
  var real_part;
  var imaginary_part;
  var determinant=Math.pow(b,2)-4*a*c;
  //check the determinants to genrate the root values
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
  //if the determinant value is smaller than 0 then find the real and imaginary parts respectively
  else
    {
        real_part=-b/(2*a);
        imaginary_part=-Math.sqrt(determinant)/2*a;
        document.write("real_part: "+real_part);
        document.write("imaginary_part: "+imaginary_part);
    }

}
