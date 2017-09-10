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
var PORT = process.env.PORT || 3006;
var jwt=require('jsonwebtoken');
var uuid=require('uuid');
//var expressJwt = require('express-jwt');
var jwtDecode = require('jwt-decode');
var key=uuid.v4();
var token;
app.use(bodyParser.json());
//requiring the sesion module
// var session = require('express-session');
// app.use(session({
//   secret: 'ssshhhhh',
//   saveUninitialized: true,
//   resave: true
// }));
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


  // app.post('/signingin', function(req, res)
  // {
  //   res.setHeader("Content-Type","application/json");
  //   var result = {status: true,message: "Successfully added"};
  // // MongoClient.connect(url,function(err,db) {
  // //   if (err) throw err;
  //     db.collection("userDetails").find({name:req.body.name,pwd:req.body.pwd}).toArray(function(err,data)
  //     {
  //       if(!err)
  //       if(data.length!=0)
  //       {
  //         //req.session.name = req.body.name;
  //         token= jwt.sign({name:req.body.name,
  //                        pwd:req.body.pwd,
  //                        expiresIn:60*60},key);
  //         res.json({"token":token, "status": "newLogin"});
  //       }
  //       else
  //       {
  //         res.json({"token":null,"status":"invalid"});
  //       }
  //     });
  // // });
  // });

  app.post('/checkUserLogin', function(req, res)
   {
     console.log(req.body.name);
     if((req.body.token)==null || (req.body.token)=='undefined' || (req.body.token)=='')
     {
       console.log("no token");
       //res.redirect('/signingin?name='+req.body.name+'&pwd='+req.body.pwd);
       res.setHeader("Content-Type","application/json");
       var result = {status: true,message: "Successfully added"};
     // MongoClient.connect(url,function(err,db) {
     //   if (err) throw err;
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
         //if(err) console.log("error is: "+err);
         console.log("done");
         //console.log("information is: "+info.name);
        //  if(info.name==req.body.name)
        //  {
        //    console.log("uname and pwd is true");
        //    res.json=({"token": req.body.token,
        //             "status": "alreadyLogged"});
        //  }
        //  else{
          //  console.log("uname or pwd not true")
          //  res.setHeader("Content-Type","application/json");
          //  var result = {status: true,message: "Successfully added"};
         // MongoClient.connect(url,function(err,db) {
         //   if (err) throw err;
             db.collection("userDetails").find({name:req.body.name,pwd:req.body.pwd}).toArray(function(err,data)
             {
               if(!err)
               if(data.length!=0)
               {
                //  token= jwt.sign({name:req.body.name,
                //                 pwd:req.body.pwd,
                //                 expiresIn:60*60},key);
                 res.json({"token":token, "status": "alreadylogged"});
               }
              //  else
              //  {
              //    res.json({"token":null,"status":"invalid"});
              //  }
             });
          // }
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
  console.log("this is logout");
  //req.token.destroy(function()
  //{
     res.json({data:"false"})
      console.log("session ended Successfully");
  //});
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
