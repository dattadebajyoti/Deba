function forgotPassword()
{
  var email = prompt("enter your email");
  console.log(email);
  $.ajax({
    url: '/userApi/forgotPassword',
    type: 'POST',
    data: {
      email: email
    }
  }).done(function(data) {
    console.log(data);
  });
}
