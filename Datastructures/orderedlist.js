var search=+process.argv[2];
console.log("the number to be searched is: "+search);
var fs=require("fs");
var text=fs.readFileSync("file1.txt").toString("UTF8");
var myarray1=text.split(",");
var myarray=[];
for(var i=0;i<myarray1.length;i++)
{
  myarray[i]=parseInt(myarray1[i]);
}
console.log(myarray);
for(i=0;i<myarray.length-1;i++)
{
  for(var j=0;j<myarray.length-i-1;j++)
  {
    if(myarray[j]>myarray[j+1])
    {
      var temp=myarray[j];
      myarray[j]=myarray[j+1];
      myarray[j+1]=temp;
    }
  }
}
console.log("the sorted list is: "+myarray);

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
for(var i=0;i<myarray.length;i++)
{
  SinglyList.add(myarray[i]);
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
var count=0;
SinglyList.search=function( value)
{

  currentNode=this.head;
  while(currentNode)
  {

    if(currentNode.data==value)
    {
      return count+1;
    }
    currentNode=currentNode.next;
    count++;
  }

}
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
  console.log("checking to find the string>>>>");
  var f=SinglyList.search(search);
  if(f)
  {
    console.log("the entered string is found at loc: "+f);
    console.log("Deleting the string");
    SinglyList.delete(f);
    SinglyList.display();
  }
  else
  {
    SinglyList.add(search);
    SinglyList.display();
    //var fs = require('fs');
    fs.appendFile('binarysearchfile.txt', search+",", function (err) {
                        if (err) throw err;
                        console.log('Saved!');
               });
  }
