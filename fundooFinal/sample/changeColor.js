function blue(card)
{
  console.log("blue:"+card);
  var div = document.getElementById(card);
  // var div = document.getElementById( 'divId' );
            div.style.backgroundColor='blue';
  $.ajax({
    url:'changeColour',
    type:'POST',
    data: {
      color: 'blue',
      noteId: card
    }
  }).done(function(data) {
    console.log("color changed");
  });
}
