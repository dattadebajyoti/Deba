function showRemainder()
{
  console.log("in showremainder");
  var promise = $.ajax({
    url: '/cardApi/remainderData',
    type: 'POST',
    data: {
      username: localStorage.getItem("uname")
    }
  }).done(function(data) {
    elem = document.getElementById("cardId");
    elem.parentNode.removeChild(elem);
    for(var i=0;i<data.length;i++)
    {
      console.log("showing trash data");
      document.getElementById("trash").innerHTML += '<div style="margin-left:250px;" class="w3-container"  id=divId>\
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
                                   </ul>\
                                  </div>\
                            </div>\
                        </div>\
                    </div>';
    }
  });
}
