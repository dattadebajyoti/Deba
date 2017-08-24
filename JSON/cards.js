function cardShuffle()
{
  //initialize suit
  var suit=["clubs","diamonds","hearts","spades"];
  document.write("the suit contains: "+suit+"<br>");
  //initialize rank
  var rank=["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"];
  document.write("the ranks for a given suit is: "+rank+"<br>");
  var deckLen=suit.length*rank.length;
  document.write("total number of cards are: "+deckLen+"<br>");
  //initialize deck
  document.write("displaying the cards"+"<br>")
  var deck=new Array(deckLen);
  for (var i = 0; i < rank.length; i++)
   {
     for (var j = 0; j < suit.length; j++)
       {
          deck[suit.length*i + j] = rank[i] + " of " + suit[j];
          document.write(deck[suit.length*i+j]+"<br>");
       }
   }
   document.write("..................................shuffling........................."+"<br>");
   document.write("CARDS AFTER SHUFFLING:"+"<br>");

   //shuffle the deck using random funtion

   for(i=0;i<deckLen;i++)
   {
     var randIndex=i+Math.round(Math.random()*(deckLen-i));
     var temp=deck[randIndex];
     deck[randIndex]=deck[i];
     deck[i]=temp;
     document.write(deck[i]+"<br>");
   }

   document.write("CARDS ALLOTTED TO EACH PLAYER IS SHOWN:"+"<br>");
   //assinging the cards to 4 players
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
   //printing the deck from a 2D array

   for(i=0;i<4;i++)
   {
     document.write("--------------------------------------"+"<br>");
     document.write("cards for player"+(i+1)+" is: "+"<br>");
     for(j=0;j<9;j++)
     {
       document.write(player[i][j]+"<br>");
     }
   }
}
