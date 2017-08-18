//function for calculating the stock report
function stockReport()
{
  var stock_no=document.getElementById("i1").value;
  var storeName=[];
  for(var i=0;i<stock_no;i++)
  {
    var a=parseInt(prompt("enter the name of stock holder:"));
    storeName.push(a);
  }
  var storeValue=[];
  for(i=0;i<stock_no;i++)
  {
    storeValue[i]=new Array(2);
  }
  for(i=0;i<stock_no;i++)
  {
    for(j=0;j<2;j++)
    {
      var b=parseInt(prompt("enter the no of shares for: "+storeName[i]));
      storeValue[i][j]=b;
      var c=parseInt(prompt("enter the share value for: "+storeName[i]));
      storeValue[i][j]=c;
    }
  }
  document.write(storeValue);
}
