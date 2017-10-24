function pin(note)
{
  $.ajax({
    url:'/checkPin',
    type:'POST',
    data: {
      noteId: note
    }
  }).done(function(data) {
    console.log("pin status from mongoose is: "+data[0].pin);
    if(data[0].pin=="true")
    {
      unPin(note);
    }
    else {
      pinIt(note);
    }
  });
}


function pinIt(note)
{
  $.ajax({
    url:'/pin',
    type:'POST',
    data: {
      noteId: note,
      pin: "true"
    }
  }).done(function(data) {
    console.log("status is: "+data);
  });
}


function unPin(note)
{
  $.ajax({
    url:'/unpin',
    type:'POST',
    data: {
      noteId: note,
      pin: "false"
    }
  }).done(function(data) {
    console.log("status is: "+data)
  });
}
