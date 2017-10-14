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
  //+++++++++++++
  var uname = localStorage.getItem("uname");
  console.log(uname);
  var promise = $.ajax({
    url: '/getData',
    type: 'POST',
    data: {
      userid: uname
    }
  }).done(function(data) {
    console.log("ok");
    for (var i = 0; i < data.length; i++) {
      console.log("doing");
      console.log("doing"+data[i].color);
      //document.getElementById('messages').innerHTML += data[i].msg;
      // $('#messages').append($('<li>').text(data[i].userName+":"+data[i].message+"                    "+data[i].timeOfMessage));
      document.getElementById("cardId").innerHTML += '<div style="margin-left:250px;" class="w3-container"  id=divId>\
                         <div id="'+data[i].cardId+'" style="width:25%; background-color:'+data[i].color+'" class="w3-card-4">\
                            <div class="w3-container w3-center">\
                               <h6 id="id">'+data[i].userId+'</h6>\
                               <h2 id ="message">' + data[i].note + '</h2>\
                                  <div class="w3-section">\
                                  <style>\
                                    ul#ul1  li {\
                                      display:inline-block;\
                                    }\
                                  </style>\
                                  <ul class="nav navbar-nav">\
                                   <li class="dropdown">\
                                     <button type="button" class="btn btn-default btn-sm w3-yellow" style="float: right;border:none;">\
                                        <a href="#" data-toggle="dropdown"><span class="glyphicon glyphicon-option-vertical" style="color:black"></span></a> \
                                        <ul class="dropdown-menu">\
                                           <li><a href="#" id="editId" onclick="editNote(\'' +data[i].cardId+ '\',\'' +data[i].note+ '\')">Edit<span class="glyphicon glyphicon-edit"></span></a></li>\
                                           <li class="divider"></li>\
                                           <li><a href="#" onclick="deleteNote(\'' +data[i].cardId+ '\')">Delete forever <span class="glyphicon glyphicon-trash"></span></a></li>\
                                           <li class="divider"></li>\
                                           <li><a href="#" onclick="trashNote(\'' +data[i].cardId+ '\')" >Move to trash <span class="glyphicon glyphicon-trash"></span></a></li>\
                                           <li class="divider"></li>\
                                           <li><a href="#">Archive <i class="material-icons">archive</i></a></li>\
                                           <li class="divider"></li>\
                                           <li>Remainder<input id="meeting" type="date" value="2011-01-13"/><span class="glyphicon glyphicon-hand-up" onclick="remainder()"></li>\
                                           <li class="divider"></li>\
                                           <li><a href="#" onclick="changeColour()">change color <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>\
                                        </ul>\
                                     </button>\
                                    </li>\
                                    <li>\
                                      <a href="#"><i class="material-icons w3-black">archive</i></a>\
                                    </li>\
                                    <li>\
                                      <a href="#" id="editId" onclick="editNote(\'' +data[i].cardId+ '\',\'' +data[i].note+ '\')"><span class="glyphicon glyphicon-edit" style="font-size:20; color:black"></span></a>\
                                    </li>\
                                    <li class="dropdown">\
                                      <button type="button" style="border:none; background:yellow">\
                                         <a href="#" data-toggle="dropdown" id="editColor" oncick="editColor()"><image src="./images/color.png" style="width:20; height:20px"></a>\
                                         <ul class="dropdown-menu">\
                                         <li>\
                                            <a href="#" id="blue" onclick="blue(\'' +data[i].cardId+ '\')"><image src="./images/blue.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="purple" onclick="purple()"><image src="./images/purple.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="lyellow" onclick="moonlyellow()"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="white" onclick="moonwhite()"><image src="./images/moonwhite.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="red" onclick="moonred()"><image src="./images/moonred.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="yellow" onclick="moonyellow()"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="grey" onclick="moongrey()"><image src="./images/moongrey.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="green" onclick="moongreen()"><image src="./images/moongreen.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="moonblue" onclick="moonblue()"><image src="./images/moonblue.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="aqua" onclick="moonaqua()"><image src="./images/moonaqua.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         </ul>\
                                      </button>\
                                    </li>\
                                   </ul>\
                                  </div>\
                            </div>\
                        </div>\
                    </div>';
    }
  })
  //+++++++++++
  // console.log(promise);
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
    console.log(username);
    var colour="white";
    //var time = localStorage.getItem("Time") || "anonymous"
    socket.emit('chat message', {
      msg: $('#m').val(),
      remainder: $('#n').val(),
      username: username,
      time: Time,
      color: colour
    });
    // console.log("in card.js"+$('#n').val());
    // remainder($('#n').val(),username);
    $('#m').val('');
    return false;
  });
  socket.on('get message', function(obj) {
    var cardUid=obj.cardId;
    var note = obj.note;
    console.log(note);
    var userid=obj.userId;
    console.log(userid);

    remainder($('#n').val(),cardUid);
    //$('<br>')
    //  socket.on('username', function(msg2){
    // $('#cardId').append($('<li>'));
    document.getElementById("cardId").innerHTML += '<div style="margin-left:250px;" class="w3-container"  id=divId>\
                       <div id="'+cardUid+'" style="width:25%; background-color:white" class="w3-card-4">\
                          <div class="w3-container w3-center">\
                             <h6 id="id">'+userid+'</h6>\
                             <h2 id ="message">' + note + '</h2>\
                                <div class="w3-section">\
                                <style>\
                                  ul#ul1  li {\
                                    display:inline-block;\
                                  }\
                                </style>\
                                <ul class="nav navbar-nav">\
                                 <li class="dropdown">\
                                   <button type="button" class="btn btn-default btn-sm w3-yellow" style="float: right;border:none;">\
                                      <a href="#" data-toggle="dropdown"><span class="glyphicon glyphicon-option-vertical" style="color:black"></span></a> \
                                      <ul class="dropdown-menu">\
                                         <li><a href="#" id="editId" onclick="editNote(\'' +cardUid+ '\',\'' +note+ '\')">Edit<span class="glyphicon glyphicon-edit"></span></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#" onclick="deleteNote(\'' +cardUid+ '\')">Delete forever <span class="glyphicon glyphicon-trash"></span></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#" onclick="trashNote(\'' +cardUid+ '\')" >Move to trash <span class="glyphicon glyphicon-trash"></span></a></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#">Archive <i class="material-icons">archive</i></a></li>\
                                         <li class="divider"></li>\
                                         <li>Remainder<input id="meeting" type="date" value="2011-01-13"/><span class="glyphicon glyphicon-hand-up" onclick="remainder()"></li>\
                                         <li class="divider"></li>\
                                         <li><a href="#" onclick="changeColour()">change color <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>\
                                      </ul>\
                                   </button>\
                                  </li>\
                                  <li>\
                                    <a href="#"><i class="material-icons w3-black">archive</i></a>\
                                  </li>\
                                  <li>\
                                    <a href="#" id="editId" onclick="editNote(\'' +cardUid+ '\',\'' +note+ '\')"><span class="glyphicon glyphicon-edit" style="font-size:20; color:black"></span></a>\
                                  </li>\
                                  <li class="dropdown">\
                                    <button type="button" style="border:none; background:yellow">\
                                       <a href="#" data-toggle="dropdown" id="editColor" oncick="editColor()"><image src="./images/color.png" style="width:20; height:20px"></a>\
                                       <ul class="dropdown-menu">\
                                       <li>\
                                          <a href="#" id="blue" onclick="blue(\'' +cardUid+ '\')"><image src="./images/blue.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="purple" onclick="purple()"><image src="./images/purple.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="lyellow" onclick="moonlyellow()"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="white" onclick="moonwhite()"><image src="./images/moonwhite.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="red" onclick="moonred()"><image src="./images/moonred.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="yellow" onclick="moonyellow()"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="grey" onclick="moongrey()"><image src="./images/moongrey.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="green" onclick="moongreen()"><image src="./images/moongreen.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="moonblue" onclick="moonblue()"><image src="./images/moonblue.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="aqua" onclick="moonaqua()"><image src="./images/moonaqua.png" style="width:20; height:20px"></a>\
                                       </li>\
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
