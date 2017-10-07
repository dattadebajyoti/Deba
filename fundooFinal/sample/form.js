//var socket=io();
//function to insert into database
$('#insert').click(submithandler);

function submithandler() {
  $.ajax({
    url: '/inserting',
    type: 'POST',
    data: {
      userName: form1.userName.value,
      password: form1.password.value,
      mobileNo: form1.mobileNo.value,
      email   : form1.email.value
    },
    sucess: function(data) {
      console.log("done");
      alert("sucess");
    }
  });
}



//function to login
function login() {
  var username=form2.username.value;
  var password=form2.password.value;
  console.log("this is:"+username);
  $.ajax({
    url: '/signingin',
    type: 'POST',
    data: {
      userName: username,
      password: password
    }
  }).done(function(result) {
    console.log(result);
    if (result.data == "false") {
      //socket.emit('user name',username);
      alert("Login Successfully");
      localStorage.setItem("username", name);
      // window.location.href = "chatApp.pug";
      //giving a call to chat api
      window.location.href="/chat";
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
        if(window.location.href !== "/") {
          // window.location.href = "index.pug";
          window.location.href="/chat";
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
            // window.location.href = "index.pug";
            window.location.href="/logBack";
          }
        });
}
