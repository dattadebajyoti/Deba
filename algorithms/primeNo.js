function primeNumber()
{
  var i,j;
  //document.write("1<br>");
  for(i=2;i<1000;i++)
  {
    var count=0;
    for(j=1;j<=i/2;j++)
    {
      if(i%j==0)
      {
        count++;
      }
    }
    if(count==1)
    {
      document.write(i+"<br>");
    }
  }
}
