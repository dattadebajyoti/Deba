function mergesort()
{
  var a,b,c,d,e,f,g,h;
  //var myarray=[1,2,5,10,50,100,500,1000];
  var rs=document.getElementById("i1").value;
  while(rs>=1000)
  {
    a=parseInt(rs/1000);
    rs=rs%1000;

    document.write("the number of 1000 required is: "+a+"<br>");

    break;
  }
  while(rs>=500)
  {
    b=parseInt(rs/500);
    rs=rs%500;
    document.write("the number of 500 required is: "+b+"<br>");
    break;
  }
  while(rs>=100)
  {
    c=parseInt(rs/100);
    rs=rs%100;
    document.write("the number of 100 required is: "+c+"<br>");
    break;
  }
  while(rs>=50)
  {
    d=parseInt(rs/50);
    rs=rs%50;
    document.write("the number of 50 required is: "+d+"<br>");
  }
  while(rs>=10)
  {
    e=parseInt(rs/10);
    rs=rs%10;
    document.write("the number of 10 required is: "+e+"<br>");
    break;
  }
  while(rs>=5)
  {
    f=parseInt(rs/5);
    rs=rs%5;
    document.write("the number of 5 required is: "+f+"<br>");
    break;
  }
  while(rs>=2)
  {
    g=parseInt(rs/2);
    rs=rs%2;
    document.write("the number of 2 required is: "+g+"<br>");
    break;
  }
  while(rs>=1)
  {
    h=parseInt(rs/1);
    rs=rs%1;
    document.write("the number of 1 required is: "+h+"<br>");
    break;
  }
}
