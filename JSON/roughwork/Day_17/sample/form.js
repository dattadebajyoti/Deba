(function () {

function init()
{
  $('#add').click(submithandler);
}
function submithandler(evt)
{
  var testform=document.getElementById('form1');

  $.ajax({
    url:'/saving',
    type:'POST',
    data: {
      firstName:form1.fname.value
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
  }
  //$(document).ready(init);
})();
