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
      console.log(data[i]);
      console.log("doing");
      console.log("doing"+data[i].color);
      console.log("title "+data[i].title);
      //document.getElementById('messages').innerHTML += data[i].msg;
      // $('#messages').append($('<li>').text(data[i].userName+":"+data[i].message+"                    "+data[i].timeOfMessage));

      // document.getElementById("cardPinned").innerHTML+='<br><br>'
      document.getElementById("cardId").innerHTML += '<br><div style="margin-left:250px; position:relative" class="w3-container"  id=divId>\
                         <div id="'+data[i].cardId+'" style="width:25%; background-color:'+data[i].color+'" class="w3-card-4">\
                            <div class="w3-container w3-center">\
                               <a href="#" onclick="pin(\'' +data[i].cardId+ '\')">\
                                  <span class="glyphicon glyphicon-pushpin" style="margin-top:0px; margin-right:-230px; color:'+data[i].pinColor+'; "></span></a>\
                               <h6 id="id">'+data[i].userId+'</h6>\
                               <h6 id ="message">' + data[i].note + '</h6>\
                               <a href="'+data[i].note+'">'+data[i].title+'</a>\
                                  <div class="w3-section">\
                                  <style>\
                                    ul#ul1  li {\
                                      display:inline-block;\
                                    }\
                                  </style>\
                                  <ul class="nav navbar-nav">\
                                   <li class="dropdown">\
                                     <button type="button" class="btn btn-default btn-sm" style="float: right;border:none; background-color:'+data[i].color+';">\
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
                                      <button type="button" style="border:none; background:'+data[i].color+'">\
                                         <a href="#" data-toggle="dropdown" id="editColor" oncick="editColor()"><image src="./images/color.png" style="width:20; height:20px"></a>\
                                         <ul class="dropdown-menu" style="columns:3; -webkit-columns: 3; -moz-columns: 3">\
                                         <li>\
                                            <a href="#" id="blue" onclick="change(\'' +data[i].cardId+ '\',\'' +"blue"+ '\')"><image src="./images/blue.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="purple" onclick="change(\'' +data[i].cardId+ '\',\'' +"purple"+ '\')"><image src="./images/purple.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="lyellow" onclick="change(\'' +data[i].cardId+ '\',\'' +"lyellow"+ '\')"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="white" onclick="change(\'' +data[i].cardId+ '\',\'' +"white"+ '\')"><image src="./images/moonwhite.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="red" onclick="change(\'' +data[i].cardId+ '\',\'' +"red"+ '\')"><image src="./images/moonred.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="yellow" onclick="change(\'' +data[i].cardId+ '\',\'' +"yellow"+ '\')"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="grey" onclick="change(\'' +data[i].cardId+ '\',\'' +"grey"+ '\')"><image src="./images/moongrey.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="green" onclick="change(\'' +data[i].cardId+ '\',\'' +"green"+ '\')"><image src="./images/moongreen.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="moonblue" onclick="change(\'' +data[i].cardId+ '\',\'' +"moonblue"+ '\')"><image src="./images/moonblue.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         <li>\
                                            <a href="#" id="aqua" onclick="change(\'' +data[i].cardId+ '\',\'' +"aqua"+ '\')"><image src="./images/moonaqua.png" style="width:20; height:20px"></a>\
                                         </li>\
                                         </ul>\
                                      </button>\
                                    </li>\
                                    <li>\
                                      <a href="#" onclick="locateCard(\'' +data[i].cardId+ '\')"><span class="glyphicon glyphicon-map-marker"></span</a>\
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
    document.getElementById("cardId").innerHTML += '<br><div style="margin-left:250px;" class="w3-container"  id=divId>\
                       <div id="'+cardUid+'" style="width:25%; background-color:white" class="w3-card-4">\
                          <div class="w3-container w3-center">\
                          <a href="#" onclick="pin(\'' +cardUid+ '\')" id="pinId">\
                             <span class="glyphicon glyphicon-pushpin" style="margin-top:0px; margin-right:-230px; color: black; "></span></a>\
                             <a href="'+note+'">'+note+'</a>\
                             <h6 id="id">'+userid+'</h6>\
                             <h6 id ="message">' + note + '</h6>\
                             <a href="'+note+'">'+obj.title+'</a>\
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
                                       <ul class="dropdown-menu" style="columns:3; -webkit-columns: 3; -moz-columns: 3>\
                                       <li>\
                                          <a href="#" id="blue" onclick="change(\'' +cardId+ '\',\'' +"blue"+ '\')"><image src="./images/blue.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="purple" onclick="change(\'' +cardId+ '\',\'' +"purple"+ '\')"><image src="./images/purple.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="lyellow" onclick="change(\'' +cardId+ '\',\'' +"lyellow"+ '\')"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="white" onclick="change(\'' +cardId+ '\',\'' +"white"+ '\')"><image src="./images/moonwhite.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="red" onclick="change(\'' +cardId+ '\',\'' +"red"+ '\')"><image src="./images/moonred.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="yellow" onclick="change(\'' +cardId+ '\',\'' +"yellow"+ '\')"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="grey" onclick="change(\'' +cardId+ '\',\'' +"grey"+ '\')"><image src="./images/moongrey.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="green" onclick="change(\'' +cardId+ '\',\'' +"green"+ '\')"><image src="./images/moongreen.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="moonblue" onclick="change(\'' +cardId+ '\',\'' +"moonblue"+ '\')"><image src="./images/moonblue.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       <li>\
                                          <a href="#" id="aqua" onclick="change(\'' +cardId+ '\',\'' +"blue"+ '\')"><image src="./images/moonaqua.png" style="width:20; height:20px"></a>\
                                       </li>\
                                       </ul>\
                                    </button>\
                                  </li>\
                                  <li>\
                                    <a href="#" onclick="locateCard(\'' +cardUid+ '\')"><span class="glyphicon glyphicon-map-marker"></span</a>\
                                  </li>\
                                 </ul>\
                                </div>\
                          </div>\
                      </div>\
                  </div>';
    //  });
  });
});
