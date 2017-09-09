function readArray()
{
  var i1=document.getElementById("i1").value;
  var i2=document.getElementById("i2").value;
  var myarray=new Array(i1);
  for(var i=0;i<i2;i++)
  {
    myarray[i]=new Array(i2);
  }
  for(i=0;i<i1;i++)
  {
    for(j=0;j<i2;j++)
    {
      var t=parseInt(prompt("enter integer value"));
      myarray.push(t);
      document.write(t+"\n");
    }
    document.write("<br>");
  }
}
