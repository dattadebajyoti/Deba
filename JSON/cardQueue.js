function cardQueue()
{
  //initialize suit
  var suit=["clubs","diamonds","hearts","spades"];
  document.write(suit+"<br>");
  //initialize rank
  var rank=["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"];
  document.write(rank+"<br>");
  var deckLen=suit.length*rank.length;
  document.write(deckLen+"<br>");
  //initialize deck
  var deck=new Array(deckLen);
  for (var i = 0; i < rank.length; i++)
   {
     for (var j = 0; j < suit.length; j++)
       {
          deck[suit.length*i + j] = rank[i] + " of " + suit[j];
          document.write(deck[suit.length*i+j]+"<br>");
       }
   }
   document.write("shuffling........................."+"<br>");
   for(i=0;i<deckLen;i++)
   {
     var randIndex=i+Math.round(Math.random()*(deckLen-i));
     var temp=deck[randIndex];
     deck[randIndex]=deck[i];
     deck[i]=temp;
     document.write(deck[i]+"<br>");
   }
   //document.write(deck);
   var deckIterate=0;
   var player=new Array(4);
   for(i=0;i<4;i++)
   {
     player[i]=new Array(9);
   }
   for(j=0;j<9;j++)
   {
     for(i=0;i<4;i++)
     {
       player[i][j]=deck[deckIterate];
       deckIterate++;
     }
   }
   for(i=0;i<4;i++)
   {
     document.write("cards for player"+(i+1)+" is: "+"<br>");
     for(j=0;j<9;j++)
     {
       document.write(player[i][j]+"<br>");
     }
   }

for(i=0;i<4;i++)
{
  for(j=0;j<8;j++)
  {
    for(k=0;k<8-j;k++)
    {
      if(player[i][k]>player[i][k+1])
      {
        var temp1=player[i][k];
        player[i][k]=player[i][k+1];
        player[i][k+1]=temp1;
      }
    }
  }
}
document.write("after shuffling------------------------"+"<br>");
document.write(player+"<br>");

var playerInfo=["player1","player2","player3","player4"];

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

//var count=0;
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
document.write("inserting into queue-------------------------"+"<br>");
for(i=0;i<4;i++)
{
  SinglyList.enque(playerInfo[i]);
  for(j=0;j<9;j++)
  {
    SinglyList.enque(player[i][j]);
  }
}

SinglyList.display=function()
{
  currentNode=this.head;
  while(currentNode)
  {
    document.write(currentNode.data+"<br>");
    currentNode=currentNode.next;
  }
}

SinglyList.display();
}
