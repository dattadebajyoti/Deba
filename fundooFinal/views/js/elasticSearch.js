function elasticSearchNote()
{
  var searchValue=searchForm.search.value;
  document.getElementById("cardId").innerHTML = '<br>';
  var promise = $.ajax({
      url:'/cardApi/searchByNote',
      type:'POST',
      data: {
        search: searchValue
      }
    }).done(function(data){
      console.log(data);
      for(var i=0;i<data.details.length;i++)
      {
        console.log(i);
        if(data.details[i]!=null && data.details[i].cardId!= undefined)
        {
          console.log(data.details[i].cardId);
          // document.write(data.details[i].note+"    "+"<br>");
          document.getElementById("cardId").innerHTML += '<br><div style="margin-left:250px; position:relative" class="w3-container"  id=divId>\
                             <div id="'+data.details[i].cardId+'" style="width:25%; background-color:'+data.details[i].color+'" class="w3-card-4">\
                                <div class="w3-container w3-center">\
                                   <a href="#" onclick="pin(\'' +data.details[i].cardId+ '\')">\
                                      <span class="glyphicon glyphicon-pushpin" style="margin-top:0px; margin-right:-230px; color:'+data.details[i].pinColor+'; "></span></a>\
                                   <h6 id="id">'+data.details[i].userId+'</h6>\
                                   <h6 id ="message">' + data.details[i].note + '</h6>\
                                   <a href="'+data.details[i].note+'">'+data.details[i].title+'</a>\
                                      <div class="w3-section">\
                                      <style>\
                                        ul#ul1  li {\
                                          display:inline-block;\
                                        }\
                                      </style>\
                                      <ul class="nav navbar-nav">\
                                       <li class="dropdown">\
                                         <button type="button" class="btn btn-default btn-sm" style="float: right;border:none; background-color:'+data.details[i].color+';">\
                                            <a href="#" data-toggle="dropdown"><span class="glyphicon glyphicon-option-vertical" style="color:black"></span></a> \
                                            <ul class="dropdown-menu">\
                                               <li><a href="#" id="editId" onclick="editNote(\'' +data.details[i].cardId+ '\',\'' +data.details[i].note+ '\')">Edit<span class="glyphicon glyphicon-edit"></span></a></li>\
                                               <li class="divider"></li>\
                                               <li><a href="#" onclick="deleteNote(\'' +data.details[i].cardId+ '\')">Delete forever <span class="glyphicon glyphicon-trash"></span></a></li>\
                                               <li class="divider"></li>\
                                               <li><a href="#" onclick="trashNote(\'' +data.details[i].cardId+ '\')" >Move to trash <span class="glyphicon glyphicon-trash"></span></a></li>\
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
                                          <a href="#" id="editId" onclick="editNote(\'' +data.details[i].cardId+ '\',\'' +data.details[i].note+ '\')"><span class="glyphicon glyphicon-edit" style="font-size:20; color:black"></span></a>\
                                        </li>\
                                        <li class="dropdown">\
                                          <button type="button" style="border:none; background:'+data.details[i].color+'">\
                                             <a href="#" data-toggle="dropdown" id="editColor" oncick="editColor()"><image src="./images/color.png" style="width:20; height:20px"></a>\
                                             <ul class="dropdown-menu" style="columns:3; -webkit-columns: 3; -moz-columns: 3">\
                                             <li>\
                                                <a href="#" id="blue" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"blue"+ '\')"><image src="./images/blue.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="purple" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"purple"+ '\')"><image src="./images/purple.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="lyellow" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"lyellow"+ '\')"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="white" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"white"+ '\')"><image src="./images/moonwhite.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="red" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"red"+ '\')"><image src="./images/moonred.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="yellow" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"yellow"+ '\')"><image src="./images/moonyellow.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="grey" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"grey"+ '\')"><image src="./images/moongrey.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="green" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"green"+ '\')"><image src="./images/moongreen.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="moonblue" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"moonblue"+ '\')"><image src="./images/moonblue.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             <li>\
                                                <a href="#" id="aqua" onclick="change(\'' +data.details[i].cardId+ '\',\'' +"aqua"+ '\')"><image src="./images/moonaqua.png" style="width:20; height:20px"></a>\
                                             </li>\
                                             </ul>\
                                          </button>\
                                        </li>\
                                        <li>\
                                          <a href="#" onclick="locateCard(\'' +data.details[i].cardId+ '\')"><span class="glyphicon glyphicon-map-marker"></span</a>\
                                        </li>\
                                       </ul>\
                                      </div>\
                                </div>\
                            </div>\
                        </div>';
        }
      }
    });
}
