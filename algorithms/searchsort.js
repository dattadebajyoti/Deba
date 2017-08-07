function binary_int()
{
  var n1=document.getElementById("i1").value;
  var myarray=new Array();
  for(var i=0;i<n1;i++)
  {
    var t=parseInt(prompt("enter integer value"));
    myarray.push(t);
  }
  var search=parseInt(prompt("enter the number to be searched"));
  var first=0;
  var last=myarray.length-1;
  var middle=Math.round(first+(last-first)/2);
  while(first<=last)
  {
    if(search<myarray[middle])
    {
      last=middle-1;
      middle=Math.round(first+(last-first)/2);
    }
    else if(search==myarray[middle])
    {
      document.write("integer is found at_"+middle+"_location");
      return;
    }
    else {
      first=middle+1;
      middle=Math.round(first+(last-first)/2);
    }
    debugger;
  }
  if (first > last)
  {
    document.write("number not found in the list");
  }
}



function binary_str()
{
  var n1=document.getElementById("i2").value;
  var myarray=new Array();
  for(var i=0;i<n1;i++)
  {
    var t=prompt("enter string");
    myarray.push(t);
  }
  var search=prompt("Enter the string to be searched");
  var first=0;
  var last=myarray.length-1;
  var middle=Math.round(first+(last-first)/2);
  while(first<=last)
  {
    if(search<myarray[middle])
    {
      last=middle-1;
      middle=Math.round(first+(last-first)/2);
    }
    else if(search==myarray[middle])
    {
      document.write("string is found at_"+middle+"_location");
      return;
    }
    else {
      first=middle+1;
      middle=Math.round(first+(last-first)/2);
    }
    debugger;
  }
  if (first > last)
  {
    document.write("string not found in the list");
  }

}


function insertion_int()
{
  var n1=document.getElementById("i3").value;
  var myarray=new Array();
  for(var i=0;i<n1;i++)
  {
    var t=parseInt(prompt("enter integer value"));
    myarray.push(t);
  }
  for(i=1;i<n1;i++)
  {
    var temp=myarray[i];
    var j=i-1;
    while(temp<myarray[j] && j>=0)
    {
      myarray[j + 1] = myarray[j];
      j = j - 1;
    }
    myarray[j + 1] = temp;
  }
  document.write(myarray);
}



function insertion_str()
{
  var n1=document.getElementById("i4").value;
  var myarray=new Array();
  for(var i=0;i<n1;i++)
  {
    var t=prompt("enter string");
    myarray.push(t);
  }
  for(i=1;i<n1;i++)
  {
    var temp=myarray[i];
    var j=i-1;
    while(temp<myarray[j] && j>=0)
    {
      myarray[j + 1] = myarray[j];
      j = j - 1;
    }
    myarray[j + 1] = temp;
  }
  document.write(myarray);
}



function bubble_int()
{
  var n1=document.getElementById("i5").value;
  var myarray=new Array();
  for(var i=0;i<n1;i++)
  {
    var t=prompt("enter integer");
    myarray.push(t);
  }
  for(i=0;i<myarray.length-1;i++)
  {
    for(j=0;j<myarray.length-i-1;j++)
    {
      if(myarray[j]>myarray[j+1])
      {
        var temp=myarray[j];
        myarray[j]=myarray[j+1];
        myarray[j+1]=temp;
      }
    }
  }
  document.write(myarray);
}



function bubble_str()
{
  var n1=document.getElementById("i6").value;
  var myarray=new Array();
  for(var i=0;i<n1;i++)
  {
    var t=prompt("enter string");
    myarray.push(t);
  }
  for(i=0;i<myarray.length-1;i++)
  {
    for(j=0;j<myarray.length-i-1;j++)
    {
      if(myarray[j]>myarray[j+1])
      {
        var temp=myarray[j];
        myarray[j]=myarray[j+1];
        myarray[j+1]=temp;
      }
    }
  }
  document.write(myarray);
}
