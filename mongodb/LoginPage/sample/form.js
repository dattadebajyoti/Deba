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







//function to delete
function deleteAccount()
{
  var getUserName=prompt("enter username");
  var getPwd=prompt("enter the password to delete your account");
  $.ajax({
    url:'/deleting',
    type:'POST',
    data: {
      name:getUserName,
      pwd: getPwd
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
}






//function to edit
function edit()
{
  var oldName=prompt("enter old name");
  var oldPwd=prompt("enter old password");
  var newName=prompt("enter new name");
  var newPwd=prompt("enter new password");
  $.ajax({
    url:'/editing',
    type:'POST',
    data: {
           name:oldName,
           pwd:oldPwd,
           nameUpdate:newName,
           pwdUpdate:newPwd
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
}








//function to search
function login()
{
  var username = prompt("enter username");
  var password=prompt("enter passwrod");
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
    }
    else {
      alert("Sorry!! please create your account first");
    }
  })
}
