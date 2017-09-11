//requiring the express module
var express =require("express");
//requiring body parser to
var bodyParser=require("body-parser");
//setting the path
var path = require("path");
//creating an object for express
var app=express();
//requiring the fs module
var fs=require('fs');
//requiring the http module to connect to the server
var http=require('http').Server(app);
//requiring the socket module
var io=require('socket.io')(http);
//setting the port to listen
//var PORT = process.env.PORT || 3006;
var jwt=require('jsonwebtoken');
var uuid=require('uuid');
var jwtDecode = require('jwt-decode');
var key=uuid.v4();
var token;
var host='127.0.0.1';
//requiring the redis module
var redis=require('redis');
var client=redis.createClient({host:'localhost',port:6379});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
//making the sample folder static for making changes permanent to it
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



  //checking whether the user is already logged in if so redirect to chat page else match the login  details with the database
  app.post('/checkUserLogin', function(req, res)
   {
     console.log(req.body.name);
     if((req.body.token)==null || (req.body.token)=='undefined' || (req.body.token)=='')
     {
       console.log("no token");
       res.setHeader("Content-Type","application/json");
       var result = {status: true,message: "Successfully added"};
         db.collection("userDetails").find({name:req.body.name,pwd:req.body.pwd}).toArray(function(err,data)
         {
           if(!err)
           if(data.length!=0)
           {
             //req.session.name = req.body.name;
             token= jwt.sign({name:req.body.name,
                            pwd:req.body.pwd,
                            expiresIn:30*30},key);
             res.json({"token":token, "status": "newLogin"});
             console.log("Token sent is: "+token);
             //connecting with the redis database
             client.on('connect',function(){
               console.log("Connected");
             });
             //storing the token in the redis
             client.set('name',name);
             client.set('token',token);
           }
           else
           {
             res.json({"token":null,"status":"invalid"});
           }
         });
      }
     else {
       console.log("token recieved is: "+req.body.token);
       console.log("token is there");
       var decode=jwtDecode(req.body.token)
       {
         console.log("done");
         res.json({"token":token, "status": "alreadylogged"});
       }
     }
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



app.get('/endToken', function(req,res)
{
  client.del('token',function(err,reply)
   {
     console.log("this is logout");
     res.json({data:"false"})
     console.log("session ended Successfully");
   });
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
