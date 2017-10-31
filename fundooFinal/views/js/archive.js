function archiveCard(note)
{
  $.ajax({
    url:'/cardApi/checkArchive',
    type:'POST',
    data: {
      noteId: note
    }
  }).done(function(data) {
    console.log("archive status from mongoose is: "+data[0].isArchive);
    if(data[0].isArchive=="true")
    {
      unArchive(note);
    }
    else {
      archive(note);
    }
  });
}


function archive(note)
{
  $.ajax({
    url:'/cardApi/archive',
    type:'POST',
    data: {
      noteId: note,
      isArchive: "true"
    }
  }).done(function(data) {
    console.log("status is: "+data);
  });
}


function unArchive(note)
{
  $.ajax({
    url:'/cardApi/archive',
    type:'POST',
    data: {
      noteId: note,
      isArchive: "false"
    }
  }).done(function(data) {
    console.log("status is: "+data)
  });
}
