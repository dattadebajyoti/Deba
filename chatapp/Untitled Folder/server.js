var express =require("express");
var bodyParser=require("body-parser");
var path = require("path");
var app=express();
var fs=require('fs');
var http=require('http').Server(app);
var io=require('socket.io')(http);
var PORT = process.env.PORT || 3004;
//app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static('./sample/'));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db)
{
  if (err) throw err;
  var json;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));


  app.post('/inserting',function(req, res)
  {
    var result = {status:true,message:"Successfully added"};
    res.setHeader('Content-Type', 'application/json');
    //console.log(req.body.name+" "+req.body.pwd);
    //  MongoClient.connect(url, function(err,db) {
    //   if (err) throw err;
      var myObj=[
      { name : req.body.name, pwd : req.body.pwd}
      ];
      db.collection("userDetails").insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("Account Created");
        //console.log("Account details: "+res.result);
        // db.close();
      })
      db.collection("userDetails").find({}, { _id: false }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        // db.close();
      });
  //  });
  });


  app.post('/signingin', function(req, res)
  {
    res.setHeader("Content-Type","application/json");
    var result = {status: true,message: "Successfully added"};
  // MongoClient.connect(url,function(err,db) {
  //   if (err) throw err;
      db.collection("userDetails").find({name:req.body.name,pwd:req.body.pwd}).toArray(function(err,data)
      {
        if(!err)
        if(data.length!=0)
        {
          req.session.name = req.body.name;
          user=req.body.name;
          console.log("hiii");
          res.json({data:"false"});
        }
        else
        {
          res.json({data:"true"});
        }
      });
  // });
  });
  //db.close();
});




io.on('connection',function(socket)
{
  socket.on('chat message', function(obj){
    var msg = obj.msg;
    var username = obj.username;
    var time = obj.time;
    console.log(msg);
    //console.log(user);
    MongoClient.connect(url, function(err,db) {
     myObj=[{ message : msg, userName: username, timeOfMessage:time}];
     db.collection("storeMessage").insertMany(myObj, function(err, res) {
       if (err) throw err;
       console.log(user);
       console.log("Message Stored");
      //  db.close();
     })
     db.collection("storeMessage").find({},{ _id: false }).toArray(function(err, result) {
       if (err) throw err;
       console.log(result);
      //  db.close();
     });
  });
    // if(err) throw err;
    io.sockets.emit('chat message', obj);
    console.log("/////////////////////////////this is "+obj.time);
    //io.emit('username',user);
    //console.log("message: " + msg);
  });
});
//

app.get('/checkUserLogin', function(req, res)
 {
   var session=req.session;
   if(session.name)
   {
     console.log("HOIOOOOOOOOO: "+session.name);
     res.json({name:session.name,isLogin:true});
   }
   else
   {
     res.json({name:session.name,isLogin:false});
   }
});




app.get('/get', function(req, res)
{
  console.log(url);
  MongoClient.connect(url, function(err,db) {
    // console.log(db);
    db.collection("storeMessage").find({}, {_id:false, message:true, userName:true, timeOfMessage:true}).toArray(function(err,data){
      if(err)throw err;
      // console.log(data);
      res.send(data);
    });
    // db.close();
   })
});



http.listen(PORT,function()
{
  console.log("server is listening to %s port",PORT);
});
