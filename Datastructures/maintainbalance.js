//var p=[1,2,3,4,5,6,7,8,9];
var cash=100000;
var rear=-1;
var front=-1;
var array=[];
function insert(item,max,transaction)
{
  if(rear==max-1)
  {
    console.log("queue overflow: ");
  }
  else
  {
    if( front==-1)
    {
      front=0;
      //cash=cash+transaction;
    }
    rear=rear+1;
    array[rear]=item;
    cash=cash+transaction;
  }
}
function Delete()
{
  if(front==-1)
  {
    console.log("queue is empty");
  }
  else
  {
    var temp=array[front];
    array[front]=null;
    front=front+1;
  }
}

function display()
{
  if(front==-1)
  console.log("queue is empty");
  else
  {
    for(var i=front;i<array.length;i++)
    console.log(array[i]);
  }
}
insert(1,5,10000);
display();
console.log(cash);
console.log("_____________________________");

Delete();
insert(4,5,5000);
display();

console.log(cash);
console.log("_____________________________");

Delete();
insert(2,5,-10000);
display();

console.log(cash);
console.log("_____________________________");

Delete();
insert(3,5,-4000);

display();
console.log(cash);
console.log("_____________________________");

Delete();
insert(5,5,3000);

display();
console.log(cash);
console.log("_____________________________");

// Delete();
// console.log("_____________________________");
// display();
