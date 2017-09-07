//var socket=io();
//function to insert into database
$('#insert').click(submithandler);
function submithandler()
{
  $.ajax({
    url:'/inserting',
    type:'POST',
    data: {
      name:form1.name.value,
      pwd:form1.pwd.value
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
}



//function to login
function login()
{
  var username = prompt("enter username");
  var password=prompt("enter password");
  $.ajax({
    url: '/signingin',
    type: 'POST',
    data: {
      name: username,
      pwd:password
    }
  }).done(function(result)
  {
    console.log(result);
    if(result.data=="false")
    {
      //socket.emit('user name',username);
      alert("Login Successfully");
      window.location.href = "chatApp.html";
    }
    else {
      alert("Sorry!! please create your account first");
    }
  })
}

function logout()
{
  window.location.href="index.html";
}



// function chatHistory() {
//   var promise = $.ajax({
//     url: '/get',
//     type: 'GET'
//   }).done(function(data) {
//     for (i = 0; i < data.length; i++) {
//       //document.getElementById('messages').innerHTML += data[i].msg;
//       $('#messages').append($('<li>').text(data[i].msg));
//     }
//   })
//   console.log(promise);
//   return true;
//
// }
