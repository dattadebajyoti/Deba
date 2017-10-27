function shareCard(noteId,userId,collaborate)
{
  console.log("in share");
  if(userId==collaborate)
  {
    document.getElementById("noteId").disabled = true;
  }
  var user=prompt("Name the person with which u want to share");
  $.ajax({
    url:'/share',
    type:'POST',
    data: {
      userId: user,
      noteId: noteId
    }
  }).done(function(data) {
    console.log(data);
  })
}
