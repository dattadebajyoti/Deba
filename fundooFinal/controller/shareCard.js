function shareCard(noteId)
{
  console.log("in share");
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
