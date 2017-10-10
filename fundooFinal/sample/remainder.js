function remainder()
{
  $.ajax({
    url: '/remainder',
    type: 'POST'
  }).done(function(data) {
    console.log(data);
  });
}
