function readArray()
{
  var i1=document.getElementById("i1").value;
  var count=0;
  var arr=new Array();
  var res=[];
  for(var i=0;i<i1;i++)
  {
    var t=parseInt(prompt("enter integer value"));
    arr.push(t);
  }
for(i=0;i<i1-2;i++)
{
  for(var j=1;j<i1-1;j++)
  {
    for(var k=1;k<i1;k++)
    {
      var m=arr[i]+arr[j]+arr[k];
      if(m==0)
      {
        count++;
        res.push(arr[i]);
        res.push(arr[j]);
        res.push(arr[k]);
        document.write(arr[i]);
        document.write(arr[j]);
        document.write(arr[k]);
      }
    }
  }
}
document.write("\n"+count);
}
