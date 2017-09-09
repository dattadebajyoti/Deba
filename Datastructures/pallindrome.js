

//taking user input
var stringInput = process.argv.slice(2);
//converting to utf8
var str = stringInput.toString("UTF8");
var array = str.split('');
console.log(array);
var size = array.length;
var queue = new Array(size);
var front = -1;
var rear = -1;

//function to insert at the rear end
function insert_r(x) {
  if (front == (rear + 1) % size) {
    console.log("Queue Overflow");
  } else if (rear == -1) {
    front = 0;
    rear = 0;
    queue[rear] = x;
  } else {
    rear = (rear + 1) % size;
    queue[rear] = x;
  }
  return queue[rear];
}

//function to insert at the front end
function insert_f(x) {
  if (front == (rear + 1) % size) {
    console.log("Queue Overflow");
  } else if (rear == -1) {
    front = 0;
    rear = 0;
    queue[rear] = x;
  } else {
    front = (front + size - 1) % size;
    queue[front] = x;
  }
  return queue[front];
}

//function to delete at the rear
function delete_r() {
  //console.log(R);
  var x;
  if (front == -1) {
    console.log("Queue Underflow");
  } else if (front == rear) {
    x = queue[front];
    queue[front] = null;
    front = -1;
    rear = -1;
  } else {
    x = queue[rear];
    queue[rear] = null;
    rear = rear - 1;
  }
  //console.log(R);
  return x;
}

//function to delete at the front
function delete_f() {
  var x;
  if (front == -1) {
    console.log("Queue Underflow");
  } else if (front == rear) {
    x = queue[front];
    front = -1;
    rear = -1;
  } else {
    x = queue[front];
    queue[front] = null;
    front = front + 1;
  }
  return x;
}

//function to display
function display() {
  for (var j = front; j <= rear; j++) {
    console.log(queue[j]);
  }
}

for (var k = 0; k < array.length; k++) {
  console.log(insert_r(array[k]));
  count++;
}
// console.log(insert_r("k"));
// console.log(insert_f("l"));

console.log("________________________");
//delete_r();
//delete_f();
//display();

var count = 0;
while (front < size && rear > -1) {
  if (queue[front] == array[rear]) {
    count++;
    front++;
    rear--;
  } else {
    break;
  }
}
if (count == array.length)
  console.log("it is a pallindrome");
else
  console.log("It is not a pallindrome");
