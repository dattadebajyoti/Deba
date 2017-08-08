  var search=process.argv.slice(2);
  var fs=require("fs");
  var text =fs.readFileSync("binarysearchfile.txt").toString("UTF8");
  var myarray=text.split(",");
  //sorting(insertion sort)
  console.log(myarray);
  for(var i=1;i<myarray.length;i++)
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
  console.log(myarray);

  //binary search
  //var search="deba";
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
      console.log("string is found at_"+middle+"_location");
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
    console.log("string not found in the list");
  }
