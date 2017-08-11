var oneD1=[];
var oneD2=[];
var oneD3=[];
var Arr1=[];
for(var l=0;l<10;l++)
{
    Arr1[l]=new Array(100);
}

var Arr2=[];
for(l=0;l<10;l++)
{
    Arr2[l]=new Array(100);
}




var arr = [];
var arr2 = [];
prime_start_end(0, 1000);

function prime_start_end(s, e) {
  var start = s;
  var end = e;
  var flag = 0;
  for (i = start; i <= end; i++) {
    flag = 0;
    for (j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      arr.push(i);
    }
  }
}
var size = arr.length;
anagram(arr, size);
var x, y;
// var m=0;
// var n=0;

function anagram(arr, size) {
  var flag;
  for (i = 0; i < size; i++) {
    //oneD2.push(arr[i]);
    if (arr[i] > 10) {
      var no1 = arr[i];
      var a = Math.floor(no1 / 10);
      var b = no1 - a * 10;
      for (j = i + 1; j < size; j++) {

        var no2 = arr[j];
        var c = Math.floor(no2 / 10);
        var d = no2 - c * 10;
        if (a == d && b == c) {

          console.log(no2 + " is a anagram of " + no1);
          oneD1.push(no1);
          oneD1.push(no2);

          break;

        } else {
          continue;
        }
      }

    }
    if (arr[i] > 100) {
      var no1 = arr[i];
      var a = Math.floor(no1 / 100);
      var b = no1 - a * 100;
      var c = Math.floor(b / 10);
      var d = b - c * 10;
      for (j = i + 1; j < size; j++) {

        var no2 = arr[j];
        var e = Math.floor(no2 / 100);
        var f = no2 - e * 100;
        var g = Math.floor(f / 10);
        var h = f - g * 10;
        arr2.push(e);
        arr2.push(g);
        arr2.push(h);
        arr2.sort();

        var a1 = arr2[0];
        var a2 = arr2[1];
        var a3 = arr2[2];
        arr2 = [];
        if ((a == a1) && (c == a2) && (d == a3)) {
          console.log(no2 + " is a anagram of " + no1);
          oneD1.push(no1);
          oneD1.push(no2);

          break;
        } else {
          continue;
        }
      }
    }

    //oneD2.push(arr[i]);
}

  // console.log(arr[i]);
}

console.log(oneD1);

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
for(i=0;i<oneD1.length;i++)
{
  SinglyList.push(oneD1[i]);
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

//SinglyList.display();

SinglyList.pop=function()
{
  var currentNode=this.head;
  var deletedNode=null;
  if(count==1)
      {
        console.log(currentNode.data);
        this.head=currentNode.next;
        deletedNode=currentNode;
        currentNode=null;
        this._length--;

        return currentNode;
      }
 var j=1;
 var beforeNodeToDelete=null;
 var nodeToDelete=null;
    while(j<count)
      {
         beforeNodeToDelete=currentNode;
         currentNode=currentNode.next;
         j++;
      }
      beforeNodeToDelete.next=null;
      console.log(currentNode.data);
      //nodeToDelete=currentNode;
      currentNode=null;
      this._length--;
      count--;
      return currentNode;
}
for(i=0;i<oneD1.length;i++)
      SinglyList.pop();
