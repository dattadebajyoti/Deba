$('#insert').click(submithandler);
function submithandler()
{
  //var testform=document.getElementById('form1');

  $.ajax({
    url:'/insert',
    type:'POST',
    data: {
      name:form1.name.value,
      password:form1.pwd.value
    },
    sucess: function(data)
    {
      alert("Account Created Successfully");
    }
  });
}
