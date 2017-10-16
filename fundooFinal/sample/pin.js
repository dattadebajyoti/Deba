function pin()
{
  $.ajax({
    url:'/pin',
    type:'GET',
  }).done(function(result) {
    console.log("pinned");
  });
}
