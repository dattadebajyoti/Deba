var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.get('/',function(req,res)
{
  res.sendFile(__dirname + '/chatapp.html');
  // res.redirect(__dirname + '/test.html');
  //res.send('<h1>Hellow World</h1>');
});
io.on('connection',function(socket)
{
  socket.on('chat message', function(msg){
    // if(err) throw err;
    io.emit('chat message', msg);
    console.log("message: " + msg);
  });
});
http.listen(3300, function(){
  console.log('listening on *:3300');
});
