var share=[];
var symbol=[];
var valueStock=[];
var dateStock=[];
//to find the total stock value
function valueOf()
{
  var total=0;
  for(var i=0;i<valueStock.length;i++)
  {
    total=total+valueStock[i]*share[i];
    var totaltemp=valueStock[i]*share[i];
    document.write("total value for share "+(i+1)+" is: "+totaltemp+"<br>");
  }
  document.write("total value of all the shares is: "+total+"<br>");
  document.write("------------------------------------------------"+"<br>");
  stockAccount();
}
//prints the report
function printReport()
{
  for(var i=0;i<share.length;i++)
  {
    if(symbol[i]!=null && share[i]!=null && valueStock[i]!=null && dateStock[i]!=null)
    {
      document.write("total shares for "+symbol[i]+" is "+share[i]+"<br>");
      document.write("value of each share is "+valueStock[i]+"<br>");
      document.write("date of adding the shar is "+dateStock[i]+"<br>");
    }
  }
  stockAccount();
}
//to buy more shares
function buy()
{
  var noOfShares=prompt("enter the total number of stocks");
  for(var i=0;i<noOfShares;i++)
  {
    var totShare=prompt("enter total number of company shares for stock: "+(i+1));
    var stockSymbol=prompt("enter the stock symbol for stock: "+(i+1));
    var value=prompt("enter the value of each share for stock: "+(i+1));
    var date=prompt("enter the date of transaction for stock: "+(i+1));
    //var fs=require("fs");
    //var text =fs.readFileSync("stockAccount.txt").toString("UTF8");
    share.push(totShare);
    symbol.push(stockSymbol);
    valueStock.push(value);
    dateStock.push(date);
  }
  printReport();
  stockAccount();
}
//to sell shares
function sell()
{
  var sellShares=prompt("enter the stock symbol of the share you want to sell");
  for(var i=0;i<symbol.length;i++)
  {
    if(sellShares==symbol[i])
    {
      delete symbol[i];
      delete valueStock[i];
      delete dateStock[i];
      delete share[i];
    }
  }
  printReport();
  stockAccount()
}
//this function prompts user what he wants to do
function stockAccount()
{
  // var noOfShares=prompt("enter the total number of shares");
  // for(var i=0;i<noOfShares;i++)
  // {
  //   var totShare=prompt("enter total number of shares for share: "+(i+1));
  //   var stockSymbol=prompt("enter the stock symbol for share: "+(i+1));
  //   var value=prompt("enter the value of each share for share: "+(i+1));
  //   var date=prompt("enter the date of transaction for share: "+(i+1));
  //   //var fs=require("fs");
  //   //var text =fs.readFileSync("stockAccount.txt").toString("UTF8");
  //   share.push(totShare);
  //   symbol.push(stockSymbol);
  //   valueStock.push(value);
  //   dateStock.push(date);
  // }
  // printReport();
  // fs.appendFile('stockAccount.txt',"total share:"+totShare+",","stock Symbol:"+stockSymbol+",",
  //               "value:"+value+",","date:"+date+",",function (err) {
  //                       if (err) throw err;
  //                       document.write('Saved!');
  //              })
  var option=prompt("what is your option: 1.print report 2.buy 3.sell 4.value of stock 5.process using linked list 6.exit? 1 or 2 or 3 or 4 or 5 or 6");
  if(option==1)
  {
    printReport();
  }
  else if(option==2)
  {
    buy();
  }
  else if(option==3)
  {
    sell();
  }
  else if(option==4)
  {
    valueOf();
  }
  else if(option==5){
    stockLinkedList();
  }
  else if(option==6){
    maintainSymbol();
  }
  else if(option==7){
    dateQueue();
  }
  else {
    document.write("exiting.......................");
  }
}

//document.write("Mainting the total shares using linked list");

function stockLinkedList()
{
  function Node(data)
  {
    this.data=data;
    this.next=null;
  }
  function SinglyList()
  {
    this._length=0;
    this.head=null;
  }

    SinglyList.add=function(value)
    {
        var node=new Node(value);
        currentNode=this.head;
      //  beforeNodeToDelete = null,
      //  nodeToDelete = null,
      //  deletedNode = null;
        if(!currentNode)
        {
          this.head=node;
          this._length++;
          return node;
        }
        while(currentNode.next)
        {
          currentNode=currentNode.next;
        }
        currentNode.next=node;
      //console.log(currentNode);
        this._length++;
        return node;
    }


//console.log("the length is: "+this._length);
  for(var i=0;i<share.length;i++)
  {
    SinglyList.add(share[i]);
  }
  var askUser=prompt("do you want to add a share? 0 or 1");
  if(askUser==1)
  {
    var addShare=prompt("enter the share symbol to be added");
    SinglyList.add(addShare)
  }
  SinglyList.display=function()
  {
    currentNode=this.head;
    while(currentNode)
    {
      console.log(currentNode.data);
      currentNode=currentNode.next;
    }
  }
  SinglyList.display();
  var res=prompt("do you want to delete a share? 0 or 1");
  if(res==1)
  {
    var deteleShare=prompt("enter the share to be deleted")
    SinglyList.delete=function(value)
    {
      var currentNode=this.head;
      var deletedNode=null;
      if(value==1)
          {
            this.head=currentNode.next;
            deletedNode=currentNode;
            currentNode=null;
            this._length--;
            return currentNode;
          }
     var j=1;
     var beforeNodeToDelete=null;
     var nodeToDelete=null;
        while(j<value)
          {
             beforeNodeToDelete=currentNode;
             currentNode=currentNode.next;
             j++;
          }
          beforeNodeToDelete.next=currentNode.next;
        //nodeToDelete=currentNode;
          currentNode=null;
          this._length--;
          return currentNode;
    }
  }

}


//maintaining stock symbol using stack implemented by linked list
function maintainSymbol()
{
  function Node(data)
  {
    this.data=data;
    this.next=null;
  }
  function SinglyList()
  {
    this._length=0;
    this.head=null;
  }

  var count=0;
  SinglyList.push=function(value)
  {
    var node=new Node(value);
    currentNode=this.head;
    if(!currentNode)
    {
      this.head=node;
      this._length++;
      return node;
    }
    while(currentNode.next)
    {
      currentNode=currentNode.next;
    }
    currentNode.next=node;
    this._length++;
    return node;
  }
    //console.log("count value is: "+this._length);
  for(i=0;i<symbol.length;i++)
  {
    SinglyList.push(symbol[i]);
    count++;
  }

  SinglyList.display=function()
  {
    currentNode=this.head;
    document.write("-----------------------");
    while(currentNode)
    {
      document.write(currentNode.data);
      currentNode=currentNode.next;
    }
  }
  SinglyList.display();
}


//maintaining date of transaction using queue implemented using linked list

function dateQueue()
{
  function Node(data)
  {
  function SinglyList()
  {
    this._length=0;
    this.head=null;
  }

  var count=0;
  SinglyList.enque=function(value)
  {
    var node=new Node(value);
    var currentNode1=null;
    currentNode=this.head;
    if(!currentNode)
    {
      this.head=node;
      this._length++;
      return node;
    }
    currentNode1=node;
    currentNode1.next=currentNode.next;
    this.head.next=currentNode1;
  }
  //console.log("count value is: "+this._length);
//SinglyList.enque("0");
  for(i=0;i<dateStock.length;i++)
  {
    SinglyList.enque(dateStock[i]);
   count++;
  }

  SinglyList.display=function()
  {
    currentNode=this.head;
    while(currentNode)
    {
      console.log(currentNode.data);
      currentNode=currentNode.next;
    }
  }

  SinglyList.display();
}
