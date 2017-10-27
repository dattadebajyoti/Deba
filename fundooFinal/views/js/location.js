var card;
function locateCard(note)
{
  card=note
  console.log("in getLocation");
  console.log(note);
  // if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //       x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  getLocation();
}


function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}
console.log("card:"+card);
function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    var cardLatitude = position.coords.latitude;
    var cardLongitude = position.coords.longitude;
    $.ajax({
      url: '/locate',
      type: 'POST',
      data: {
        noteId: card,
        latitude: cardLatitude,
        longitude: cardLongitude
      },
      sucess: function(data) {
        console.log("done");
        alert("sucess");
      }
    });
}
