var search=process.argv.slice(2);
//console.log(search);
var fs=require("fs");
var text =fs.readFileSync("binarysearchfile.txt").toString("UTF8");
var myarray=text.split(",");
console.log(myarray);
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
     beforeNodeToDelete = null,
     nodeToDelete = null,
     deletedNode = null;
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
var i=0;
var j=0;
var count=0;
console.log(i);
SinglyList.search=function()
{

  currentNode=this.head;
  while(currentNode)
  {

    if(currentNode.data==search)
    {
      console.log("the entered string is found at loc: "+(i+1));
      break;
    }
    currentNode=currentNode.next;
    count=count+1;;
  }
    console.log(i);

SinglyList.delete=function(value)
{
  if(value==1)
      {
        this.head=currentNode.next;
        deletedNode=currentNode;
        currentNode=null;
        this._length--;
        return currentNode;
      }
  var j=1;
 currentNode=this.head;
 var beforeNodeToDelete=null;
 var nodeToDelete=null;
    while(j!=value)
      {
         beforeNodeToDelete=currentNode;
         currentNode=currentNode.next;
         j++;
               }
      beforeNodeToDelete=currentNode.next;
      currentNode=null;
      this._length--;
      return deletedNode;
    }
  }
  SinglyList.search();


  SinglyList.delete(7);
  SinglyList.display();
