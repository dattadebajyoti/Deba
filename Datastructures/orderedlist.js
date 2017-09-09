// //taking user input to search
// var search=+process.argv[2];
// //requiring the fs module
// var fs = require("fs");
// var text = fs.readFileSync("file1.txt").toString("UTF8");
// //storing the values into an array splited by coma
// var myarray = text.split(",");
// var size = myarray.length;
// var arr = [];
// for (i = 0; i < size; i++) {
//   arr[i] = parseInt(myarray[i]);
// }
// //calling the sort function
// sort(arr, size);
//
// //function to sort
// function sort(arr, n)
// {
//   var i, j;
//   for (var i = 0; i < n - 1; i++)
//   {
//     for (j = 0; j < n - i - 1; j++)
//     {
//       if (arr[j] > arr[j + 1])
//       {
//         swap(arr, j, j + 1);
//       }
//     }
//   }
// }
//
// //creating a node
// function Node(data) {
//   this.value = data;
//   this.next = null;
// }
//
// function orderedList() {
//   this.len = 0;
//   this.head = null;
// }
// //function to print the linked list
// orderedList.output = function() {
//   var ws = fs.createWriteStream("file1.txt");
//   currentNode = this.head;
//   while (currentNode) {
//     var data = currentNode.value;
//     var space = ",";
//     console.log(data);
//     ws.write(data, 'UTF8');
//     ws.write(space, 'UTF8');
//     currentNode = currentNode.next;
//   }
//   ws.end();
// }
// /*display the node elements in the ordered list */
// orderedList.display = function() {
//   currentNode = this.head;
//   while (currentNode.next) {
//     console.log(currentNode.value);
//     currentNode = currentNode.next;
//   }
//   console.log(currentNode.value);
//
// }
//
//
// //function to add in a linked list
// orderedList.add = function(value) {
//   var node = new Node(value);
//   currentNode = this.head;
//   if (currentNode == null) {
//     this.head = node;
//     this.len++;
//     return node;
//   }
//   while (currentNode.next) {
//     currentNode = currentNode.next;
//   }
//   currentNode.next = node;
//   this.len++;
//   return node;
// }
//
//
//
// //function to remove from a linked list
// orderedList.remove = function(value) {
//   var removeNode = null;
//   var beforeNodeDelete = null;
//   currentNode = this.head;
//   //checking if the curerent node value is equal to the node to deleted
//   if (currentNode.value == value)
//   {
//     this.head = currentNode.next;
//     removeNode = currentNode;
//     currentnode = null;
//     this.len--;
//     console.log("removed node:" + removeNode.value);
//   } else {
//     while (currentNode.value != value) {
//       beforeNodeDelete = currentNode;
//       currentNode = currentNode.next;
//     }
//     beforeNodeDelete.next = currentNode.next;
//     removeNode = currentNode;
//     currentNode = null;
//     this.len--;
//     console.log("removed node:" + removeNode.value);
//   }
// }
//
//
//
// //checking if the searched value is int the list if found delete else it is entered into the text file
// orderedList.search = function(value) {
//   var flag = 0;
//   currentNode = this.head;
//   while (currentNode != null) {
//     if (currentNode.value == value) {
//       flag = 1;
//       console.log("The entered value " + value + " is found");
//       console.log("removing the value from the list")
//       orderedList.remove(value);
//       break;
//     }
//     currentNode = currentNode.next;
//   }
//   if (flag == 0) {
//     console.log("The entered value " + value + " is not found");
//     console.log("adding the entered value in the list")
//     orderedList.maintainOrder(value, value);
//   }
// }
//
// //inserting the element at its desired position to maintain order
// orderedList.maintainOrder = function(pos, value) {
//   var newnode = new Node(value);
//   currentNode = this.head;
//   var beforeNode = null;
//   var afterNode = null;
//   var count = 1;
//
//   while (count != pos) {
//     beforeNode = currentNode;
//     currentNode = currentNode.next;
//     count++;
//   }
//   beforeNode.next = newnode;
//   newnode.next = currentNode;
//   this.len++;
// }
//
// function swap(arr, i, j) {
//   var temp;
//   temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }
//
//
// for (i = 0; i < size; i++) {
//   orderedList.add(arr[i]);
// }
// //orderedList.search(search);
// orderedList.search(1);
// orderedList.display();


var search=process.argv.slice(2);
//console.log(search);
var fs=require("fs");
var text =fs.readFileSync("file1.txt").toString("UTF8");
var myarray=text.split(" ");
//console.log(myarray);

for(var i=0;i<myarray.length-1;i++)
{
  for(var k=0;k<myarray.length-i-1;k++)
  {
    if(myarray[k]>myarray[k+1])
    {
      console.log(myarray[k]+"  "+myarray[k+1])
      var temp=myarray[k];
      myarray[k]=myarray[k+1];
      myarray[k+1]=temp;
    }
    console.log("pass"+myarray);
  }
}
console.log("hii");
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
//console.log("the length is: "+this._length);
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
//console.log(i);
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

  for(i=0;i<myarray.length;i++)
  {
    SinglyList.add(myarray[i]);
  }
  console.log("checking to find the string>>>>");
  var find=SinglyList.search(search);
  if(find)
  {
    console.log("the entered string is found at loc: "+find);
    console.log("Deleting the string");
    SinglyList.delete(find);
    SinglyList.display();
  }
  else
  {
    //SinglyList.add(search);
    SinglyList.display();
    //var fs = require('fs');
    fs.appendFile('file1.txt', search+" ", function (err) {
                        if (err) throw err;
                        console.log('Saved!');
               });
  }
