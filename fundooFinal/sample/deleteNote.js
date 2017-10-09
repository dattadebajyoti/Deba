function deleteNote(note)
{
  console.log(note);
  var element = document.getElementById("divId");
  element.parentNode.removeChild(element);
  $.ajax({
    url: '/deleteCard',
    type: 'POST',
    data: {
      deleteNote:note
    },
    sucess: function(data) {
      console.log("done");
      alert("sucess");
    }
  });
}
