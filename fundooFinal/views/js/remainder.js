function remainder(rem,cardid)
{
  console.log(form3.n.value);
  console.log("in remainder:"+rem);
  $.ajax({
    url: '/remainder',
    type: 'POST',
    data: {
      noteId: cardid,
      remainder: rem
    }
  }).done(function(data) {
    console.log(data);
  });
}
