function editNote(noteid,note)
{
  console.log(noteid);
  editnote=prompt("Enter note");
  var strNote=document.getElementById("message");
  strNote.innerHTML = strNote.innerHTML.replace(note,editnote);
  $.ajax({
    url: '/editNote',
    type: 'POST',
    data: {
      noteId:noteid,
      editNote:editnote
    },
    sucess: function(data) {
      console.log("done");
      alert("sucess");
    }
  });
}
