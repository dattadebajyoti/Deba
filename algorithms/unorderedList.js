var search=process.argv.slice(2);
var fs=require("fs");
var text =fs.readFileSync("binarysearchfile.txt").toString("UTF8");
var myarray=text.split(",");
function Node(data)
{
  this.data=data;
  this.Next=NULL;
}
function SinglyList()
{
  this._length=0;
  this.head=NULL;
}

  SinglyList.prototype.add=function(value)
  {
    var node=new node(value);
    var currentNode=this.head;
    if(!currentNode)
    {
      this.head=node;
      this._length++
    }
    while(currentNode.Next)
    {
      currentNode=currentNode.Next;
    }
    currentNode.Next=node;
    this._length++;
  }
  for(var i=0;i<myarray.length;i++)
  {
    add(myarray[i]);
  }
while(currentNode.Next)
{
  console.log(currentNode);
  currentNode=currentNode.next;
}
