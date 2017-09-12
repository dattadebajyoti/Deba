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
  var username = prompt("enter username");
  var password = prompt("enter password");
  $.ajax({
    url: '/signingin',
    type: 'POST',
    data: {
      name: username,
      pwd: password
    }
  }).done(function(result) {
    console.log(result);
    if (result.data == "false") {
      //socket.emit('user name',username);
      alert("Login Successfully");
      localStorage.setItem("username", username);
      window.location.href = "chatApp.html";
    } else {
      alert("Sorry!! please create your account first");
    }
  })
}


function session() {
  return new Promise(function(resolve, reject) {
    var promise = $.ajax({
      url: '/checkUserLogin',
      type: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function(data) {
      //debugger;
      var name = data.name;
      console.log(name);
      localStorage.setItem("username", name);
      if (data.isLogin) {
        //alert("logged in");
        document.getElementById("status").innerHTML = name + "<br>Online";
        //window.location.href = "chatApp.html";
        //database();
      }
      else {
      //  console.log("hellow");
        //logout();
        if(window.location.href !== "index.html") {
          window.location.href = "index.html";
        }
      }
      resolve(data);
    });

  });
}

function logout() {
  console.log("ok doing log out");
  $.ajax({
    url : '/endSession',
    type : 'GET',
    headers : {
      "Content-Type" : "Application/Json"
    }
  }).done(function(result)
        {
          console.log(result.data);
          if(result.data == "false")
          {
            alert("Logging out");
            console.log(result.data);
            window.location.href = "index.html";
          }
        });
}
