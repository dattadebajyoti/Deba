// storing the ranks
var rank = ['ace', 'king', 'queue', 'jack', 10, 9, 8, 7, 6, 5, 4, 3, 2];
//storing the cards
var suit = ['diamond', 'clubs', 'spades', 'heart'];
//creating list for storing the sorted cards
var sortedList = new list();
// creating a node
function node(obj, next) {
  this.obj = obj;
  this.next = null;
};

function list() {
  this.head = null;
  this.end = null;
  this.number = 0;

  //function to add a new node in a linked list
  this.add = function(obj) {
    var node1 = new node(obj, null);
    //checking whether any nod eis present or not if not add node in the front
    if (this.head == null) {
      this.head = node1;
      this.end = node1;
    }
    //else is the node are present then add new node to the last
    else {
      this.end.next = node1;
      this.end = node1;
    }
    this.number++;
  }
  //function to romeove a node
  this.remove = function() {
    //if no nodes are present
    if (this.number == 0) {
      return null;
    }
    if (this.number == 1) {
      var obj = this.head.obj;
      this.head = null;
      this.end = null;
      this.length--;
      return obj;
    }
    //removingnodes from front
    var obj = this.head.obj;
    this.head = this.head.next;
    this.length--;
    return obj;
  }

  //function to display the list
  this.display = function() {
    var string = '';
    var current = this.head;
    while (current) {
      string += current.obj.rank + ' ';
      current = current.next;
    }
    console.log(string.trim());
  }
}
//implementing queue using the linked list
function Queue() {
  this.length = 0;
  this.front = null;
  this.rear = null;
  this.q = new list();
  //function to enque
  this.enq = function(obj) {
    this.q.add(obj);
    this.length++;
    this.front = this.q.head;
    this.rear = this.q.end;
  }
  //function to dequeue
  this.deq = function() {
    var obj = this.q.remove();
    this.length--;
    this.front = this.q.head;
    this.rear = this.q.end;
    return obj;
  }
  //function checking whether the queue is empty or not
  this.isEmpty = function() {
    if (this.length == 0) {
      return true;
    } else return false;
  }
}

//creating the card object
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}
//creating a player object
function Player() {
  this.queue = new Queue();
  this.sorting = function() {

    for (i = this.queue.length; i > 0; i--) {
      var current = this.queue.front;
      while (current.next != null) {
        if (compare(current.obj, current.next.obj) == 2) {
          //swap values
          var temp = new node(null, null);
          temp.obj = current.obj;
          current.obj = current.next.obj;
          current.next.obj = temp.obj;
        }
        current = current.next;
      }
    }
  }
}

//function comparing the rank of to cards
function compare(a, b) {
  var rank1 = a.rank;
  var rank2 = b.rank;
  //getting index of the rank
  r1 = rank.indexOf(rank1);
  r2 = rank.indexOf(rank2);
  if (r1 <= r2) return 1;
  else return 2;
}
// array to store ranks and suits
var ranks = ['Ace', 'King', 'Queue', 'Jack', 10, 9, 8, 7, 6, 5, 4, 3, 2];
var suits = ['diamond', 'clubs', 'spades', 'heart'];
//list for storing sorted ranks
var sortedList = new list();
// list node structure
function node(obj, next) {
  this.obj = obj;
  this.next = null;
};
//creating a linked list
function list() {
  this.head = null;
  this.end = null;
  this.number = 0;
  //for adding node to the list
  this.add = function(obj) {
    var node1 = new node(obj, null);
    //no nodes are present before
    if (this.head == null) {
      this.head = node1;
      this.end = node1;
    }
    //if nodes are present, add at last
    else {
      this.end.next = node1;
      this.end = node1;
    }
    //increment the nummber of nodes
    this.number++;
  }
  //for removing element from end
  this.remove = function() {
    //if no nodes are present
    if (this.number == 0) {
      return null;
    }
    if (this.number == 1) {
      var obj = this.head.obj;
      this.head = null;
      this.end = null;
      this.length--;
      return obj;
    }
    //removingnodes from front
    var obj = this.head.obj;
    this.head = this.head.next;
    this.length--;
    return obj;
  }

  this.display = function() {
    var string = '';
    var current = this.head;
    while (current) {
      string += current.obj.rank + ' ';
      current = current.next;
    }
    console.log(string.trim());
  }
}
//Queue function and methods
function Queue() {
  this.length = 0;
  this.front = null;
  this.rear = null;
  this.q = new list();
  //function to add element
  this.enq = function(obj) {
    this.q.add(obj);
    this.length++;
    this.front = this.q.head;
    this.rear = this.q.end;
  }
  //function to Dequeue
  this.deq = function() {
    var obj = this.q.remove();
    this.length--;
    this.front = this.q.head;
    this.rear = this.q.end;
    return obj;
  }
  //function to chk queue is empty
  this.isEmpty = function() {
    if (this.length == 0) {
      return true;
    } else return false;
  }
}

//creating a card object
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}
//player object
function Player() {
  this.queue = new Queue();
  this.sorting = function() {

    for (var j = this.queue.length; j > 0; j--) {
      var current = this.queue.front;
      while (current.next != null) {
        if (compare(current.obj, current.next.obj) == 2) {
          //swap values
          var temp = new node(null, null);
          temp.obj = current.obj;
          current.obj = current.next.obj;
          current.next.obj = temp.obj;
        }
        current = current.next;
      }
    }
  }
}
//sorting functions
//function to compare rank of a and b
function compare(a, b) {
  var rank1 = a.rank;
  var rank2 = b.rank;
  //getting position of rank in ranks array
  r1 = ranks.indexOf(rank1);
  r2 = ranks.indexOf(rank2);
  if (r1 <= r2) return 1;
  else return 2;
}
//function to chk distinct cards
function different(card, game) {
  var temp = game.q.head;
  while (temp != null) {
    var temp2 = temp.obj.queue.front;
    while (temp2 != null) {
      if ((temp2.obj.rank == card.rank) && (temp2.obj.suit == card.suit)) {
        return false;
      }
      temp2 = temp2.next;
    }
    temp = temp.next;
  }
  return true;
}
//function to printCards
function printCards(game) {
  var i = 1;
  var temp = new node(null, null);
  temp = game.q.head;
  while (temp != null) {
    console.log("Cards for Player " + i++);
    var temp2 = temp.obj.queue.front;
    while (temp2 != null) {
      console.log(temp2.obj.rank + " of  " + temp2.obj.suit);
      temp2 = temp2.next;
    }
    console.log("________________________________");
    temp = temp.next;
  }
}
//function for shuffling and printing the cards
function shuffle() {
  var game = new Queue();
  for (var i = 0; i < 4; i++) {
    player = new Player();
    game.enq(player);
    for (var j = 0; j < 9; j++) {
      flag = false;
      while (flag == false) {
        var rank = Math.floor((Math.random() * 100) % 13);
        var suit = Math.floor((Math.random() * 10) % 4);
        card = new Card(suits[suit], ranks[rank]);
        if (different(card, game) == true) {
          game.rear.obj.queue.enq(card);
          flag = true;
        }
      }
    }
  }
  console.log("Cards without ranking");
  console.log("***********************");
  printCards(game);
  var temp = game.front;
  while (temp != null) {
    temp.obj.queue.q = temp.obj.sorting();
    temp = temp.next;
  }
  console.log("Cards with ranking");
  console.log("********************************************");
  printCards(game);
}
//calling function
shuffle();
