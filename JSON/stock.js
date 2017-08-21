function stockValue(stockArray)
{
   for(var i=0;i<stockArray.length;i++)
   {
       document.write("Share Name:"+stockArray[i][0]+"<br>");
       document.write("No of Shares:"+stockArray[i][1]+"<br>");
       document.write("Share Price:"+stockArray[i][2]+"<br>");
       var stockValue=stockArray[i][1]*stockArray[i][2];
       document.write("Stock value   :"+stockValue);
       document.write("----------------------------------");
   }
}


function totstockValue(stockArray)
{
   var total=0;
   for(var i=0;i<stockArray.length;i++)
   {
      total=total+stockArray[i][1]*stockArray[i][2];
      document.write("total stock value: "+total);
   }
}


function stock()
{
   noOfStocks=document.getElementById("n").value;
   var stockArray=[];
   for(var i=0;i<noOfStocks;i++)
   {
      stockArray[i]=new Array(3);
   }
   for(i=0;i<noOfStocks;i++)
   {
      var shareName=prompt("enter share name","");
      var shareNo=prompt("enter no of shares","");
      var sharePrice=prompt("enter price of each share","");
      stockArray[i]=[shareName,shareNo,sharePrice];
   }
   stockValue(stockArray);
   totstockValue(stockArray);
}


