function addLabel(noteId)
{
  var label=prompt("Give a label");
  console.log("in add label");
  $.ajax({
    url:"/cardApi/level",
    type:'POST',
    data: {
      cardId: noteId,
      label: label
    }
  }).done(function(data) {
    console.log(data);
  });
}
