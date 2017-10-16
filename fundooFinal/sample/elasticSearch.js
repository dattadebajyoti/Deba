function elasticSearchNote()
{
  var searchValue=searchForm.search.value;
  var promise = $.ajax({
      url:'/searchByNote',
      type:'POST',
      data: {
        search: searchValue
      }
    }).done(function(result){
      for(var i=0;i<result.details.length;i++)
      {
        console.log(i);
        if(result.details!=null)
        {
          document.write(result.details[i]+"    "+"<br>");
        }
      }
    });
}
