function readArray()
{
  //take the no. of elements to be used in a variable i1
  var i1=document.getElementById("i1").value;
  var count=0;//variable to hold the distinct number of triplets
  var arr=new Array();
  var res=[];//stores the triplets for their sum is 0
  for(var i=0;i<i1;i++)
  {
    //var i is used to iterate through till the length of the array
    //prompt the user to enter the value and push it into the array
    var t=parseInt(prompt("enter integer value"));
    arr.push(t);
  }
for(i=0;i<i1-2;i++)
{
  for(var j=1;j<i1-1;j++)
  {
    for(var k=1;k<i1;k++)
    {
      //declare a variable m to store the total sum of first three array values
      var m=arr[i]+arr[j]+arr[k];
      if(m==0)
      {
        //if the sum is 0 increment count and push it into the array res
        count++;
        res.push(arr[i]);
        res.push(arr[j]);
        res.push(arr[k]);
        document.write(arr[i],",");
        document.write(arr[j],",");
        document.write(arr[k]);
        document.write("<br>");
      }
    }
  }
}
document.write("Number of triplets are: "+count);
}
