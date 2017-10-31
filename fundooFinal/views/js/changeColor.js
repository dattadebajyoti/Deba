function change(card,colorType)
{
  var color=["#0087be","#4e0550","#ffc04c","white","#db4545","#ffc125","#a3a3a3","#71b16e","#83bce1","#7fbfff"];
  console.log(color);
  console.log("blue:"+card);
  var div = document.getElementById(card);
  // var div = document.getElementById( 'divId' );
  var setColor;
  if(colorType=="blue")
     { div.style.backgroundColor=color[0]; setColor= color[0]; }
  else if(colorType=="purple")
     { div.style.backgroundColor=color[1]; setColor= color[1];}
  else if(colorType=="lyellow")
     { div.style.backgroundColor=color[2]; setColor= color[2];}
  else if(colorType=="white")
     { div.style.backgroundColor=color[3]; setColor= color[3];}
  else if(colorType=="red")
     { div.style.backgroundColor=color[4]; setColor= color[4];}
  else if(colorType=="yellow")
     { div.style.backgroundColor=color[5]; setColor= color[5];}
  else if(colorType=="grey")
     { div.style.backgroundColor=color[6]; setColor= color[6];}
  else if(colorType=="green")
     { div.style.backgroundColor=color[7]; setColor= color[7];}
  else if(colorType=="moonblue")
     { div.style.backgroundColor=color[8]; setColor= color[8];}
  else
     { div.style.backgroundColor=color[9]; setColor= color[9];}
  $.ajax({
    url:'/cardApi/changeColour',
    type:'POST',
    data: {
      color: setColor,
      noteId: card
    }
  }).done(function(data) {
    console.log("color changed");
  });
}
