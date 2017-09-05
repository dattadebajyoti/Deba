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
