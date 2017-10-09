var currentdate = new Date();

function sessionStart() {
  var name = session();
  //  .done(function (data) {
  //  console.log(data);
  //  }).catch(function (error) {
  //       console.log(error);
  //       });
}
$(function() {
  var socket = io();
  //var Time
  var promise = $.ajax({
    url: '/get',
    type: 'GET'
  }).done(function(data) {
    for (var i = 0; i < 10; i++) {
      console.log("doing");
      //console.log("doing"+data[i].timeOfMessage);
      //document.getElementById('messages').innerHTML += data[i].msg;
      // $('#messages').append($('<li>').text(data[i].userName+":"+data[i].message+"                    "+data[i].timeOfMessage));
    }
  })
  console.log(promise);
  //return true;
  //
  $('form').submit(function() {
    var hours = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    Time = hours + ':' + minutes + ' ' + ampm;
    var username = localStorage.getItem("username") || "anonymous"
    //var time = localStorage.getItem("Time") || "anonymous"
    socket.emit('chat message', {
      msg: $('#m').val(),
      username: username,
      time: Time
    });
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(obj) {
    var cardUid=obj.cardId;
    var note = obj.note;
    console.log(note);
    var userid=obj.userId;
    console.log(userid);
    //$('<br>')
    //  socket.on('username', function(msg2){
    // $('#cardId').append($('<li>'));
    document.getElementById("cardId").innerHTML += '<div class="w3-container" id=divId>\
                       <div style="width:25%" class="w3-card-4 w3-yellow">\
                          <div class="w3-container w3-center">\
                             <h6 id="id">'+userid+'</h6>\
                             <h2 id ="message">' + note + '</h2>\
                                <div class="w3-section">\
                                <ul class="nav navbar-nav">\
                                 <li class="dropdown">\
                                   <button type="button" class="btn btn-default btn-sm" style="float: left;">\
                                      <a href="#" data-toggle="dropdown"><span class="glyphicon glyphicon-option-vertical"></span></a> \
                                      <ul class="dropdown-menu">\
                                         <li><a href="#" onclick="editNote(\'' +cardUid+ '\',\'' +note+ '\')">Edit<span class="glyphicon glyphicon-edit"></span></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#" onclick="deleteNote(\'' +cardUid+ '\')">Delete forever <span class="glyphicon glyphicon-trash"></span></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#" onclick="trashNote()" >Move to trash <span class="glyphicon glyphicon-trash"></span></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#">Archive <i class="material-icons">archive</i></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#">Remainder<span class="glyphicon glyphicon-hand-up"></a>\
                                         </li>\
                                         <li class="divider"></li>\
                                         <li><a href="#" onclick="changeColour()">change color <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>\
                                      </ul>\
                                   </button>\
                                  </li>\
                                 </ul>\
                                </div>\
                          </div>\
                      </div>\
                  </div>';
    //  });
  });
});
