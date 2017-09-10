//var socket=io();
//function to insert into database
$('#insert').click(submithandler);

function submithandler() {
  $.ajax({
    url: '/inserting',
    type: 'POST',
    data: {
      name: form1.name.value,
      pwd: form1.pwd.value
    },
    sucess: function(data) {
      alert("sucess");
    }
  });
}



//function to login
function login() {
  // var username = prompt("enter username");
  // var password = prompt("enter password");
  var username=form2.username.value;
  var password=form2.password.value;
  console.log("name sent from client is: "+username);
  $.ajax({
    url: '/checkUserLogin',
    type: 'POST',
    data: {
      name: username,
      pwd: password,
      token: localStorage.getItem('token')
    }
  }).done(function(result) {
    console.log("hiiiiiiiiiiiiiiiiiiiiiii");
    console.log("token found is: "+result.token);
    var token=result.token;
    localStorage.setItem("username", username);
    localStorage.setItem("token",token);
    if (token!=null) {
      //socket.emit('user name',username);
      if(result.status=="newLogin")
      {
        alert("Logged in Successfully");
      }
      else{
        alert("Already Logged in");
      }
      window.location.href = "chatApp.html";
    } else if(result.status=="invalid"){
      alert("Sorry!! invalid username or password");
    }
  })
}


// function session() {
//   return new Promise(function(resolve, reject) {
//     var promise = $.ajax({
//       url: '/checkUserLogin',
//       type: 'GET',
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }).done(function(data) {
//       //debugger;
//       var name = data.name;
//       console.log(name);
//       localStorage.setItem("username", name);
//       if (data.isLogin) {
//         //alert("logged in");
//         document.getElementById("status").innerHTML = name + "<br>Online";
//         //window.location.href = "chatApp.html";
//         //database();
//       }
//       else {
//       //  console.log("hellow");
//         //logout();
//         if(window.location.href !== "index.html") {
//           window.location.href = "index.html";
//         }
//       }
//       resolve(data);
//     });
//
//   });
// }

function logout() {
  console.log("ok doing log out");
  $.ajax({
    url : '/endToken',
    type : 'GET',
    headers : {
      "Content-Type" : "Application/Json"
    }
  }).done(function(result)
        {
          console.log(result.data);
          if(result.data == "false")
          {
            localStorage.clear();
            alert("Logging out");
            console.log(result.data);
            window.location.href = "index.html";
          }
        });
}
