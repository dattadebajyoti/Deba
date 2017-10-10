function trashNote(trashNote) {
  var element = document.getElementById("divId");
  element.parentNode.removeChild(element);
  var datetime = new Date();
  var seconds = datetime.getSeconds();
  // console.log(seconds);
  var minutes = datetime.getMinutes() + 2;
  console.log(minutes);
  var hrs = datetime.getHours();
  // console.log(hrs);
  var month = datetime.getMonth();
  // console.log(month);
  var day = datetime.getDay();
  // console.log(day);
  var year = datetime.getFullYear();
  // console.log(year);
  var date=datetime.getDate();
  $.ajax({
    url: '/trash',
    type: 'POST',
    data: {
      trashnote: trashNote,
      second:seconds,
      minute:minutes,
      hours:hrs,
      month:month,
      date:date,
      day:day,
      year:year
    }
  }).done(function(data) {
    console.log(data);
  });
}
