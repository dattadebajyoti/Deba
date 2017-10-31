function editNote(noteid,note)
{
  console.log(noteid);
  editnote=prompt("Enter note");
  var strNote=document.getElementById("message");
  if(editnote!=null)
  {
    strNote.innerHTML = strNote.innerHTML.replace(note,editnote);
  }
  else {
    strNote.innerHTML = strNote.innerHTML.replace(note,note);
  }
  $.ajax({
    url: '/cardApi/editNote',
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
