function primeNumber()
{
  var i,j;
  document.write("1<br>");
  var count_prime=0;
  var arr=new Array();
  var arr1=new Array();
  for(i=2;i<1000;i++)
  {
    var count=0;
    for(j=1;j<i/2;j++)
    {
      if(i%j==0)
      {
        count++;
      }
    }
    if(count==1)
    {
      document.write(i+"<br>");
      count_prime++;
      arr.push(i.toString());
    }
  }
  console.log(arr,arr.length);
  document.write(arr);
  document.write("no of prime is"+(count_prime+1)+"<br>");
  for(i=0;i<arr.length-1;i++)
  {
    arr1.push(arr[i]);
    for(j=1;j<arr.length;j++)
    {
      document.write(arr[i]+"i <br>"+arr[j]+"j <br>");
      var count=0;
      for(var k=0;k<arr[j].length;k++)
      {
        for(var l=0;l<arr1[i].length;l++)
        {
          document.write(arr[k]+"i <br>"+arr[l]+"j <br>");
          if(parseInt(arr1[l])==parseInt(arr[k]))
          {
            count++;
            break;
          }
        }
        if(count==arr1[i].length)
        {
          document.write(a[i]+"_is an anagram of_"+a[j]);
        }
      }
    }
  }
}
