//requiring the express module
var express = require("express");
//requiring body parser to
var bodyParser = require("body-parser");
//setting the path
var path = require("path");
//creating an object for express
var app = express();
//requiring the fs module
var fs = require('fs');
//requiring the http module to connect to the server
var http = require('http').Server(app);
//requiring the socket module
var io = require('socket.io')(http);
//setting the port to listen
var PORT = process.env.PORT || 3007;
var jwt = require('jsonwebtoken');
var uuid = require('uuid');
//var expressJwt = require('express-jwt');
var jwtDecode = require('jwt-decode');
var key = uuid.v4();
var token;
var redis = require('redis');
var client = redis.createClient({
  host: 'localhost',
  port: 6379
});
app.use(bodyParser.json());
//requiring the sesion module
// var session = require('express-session');
// app.use(session({
//   secret: 'ssshhhhh',
//   saveUninitialized: true,
//   resave: true
// }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static('./sample/'));
//connecting to the mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//connecting with the mongoDB
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var json;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //api to insert
  app.post('/inserting', function(req, res) {
    var result = {
      status: true,
      message: "Successfully added"
    };
    res.setHeader('Content-Type', 'application/json');
    //console.log(req.body.name+" "+req.body.pwd);
    //  MongoClient.connect(url, function(err,db) {
    //   if (err) throw err;
    var myObj = [{
      name: req.body.name,
      pwd: req.body.pwd
    }];
    db.collection("userDetails").insertOne(myObj, function(err, res) {
      if (err) throw err;
      console.log("Account Created");
      //console.log("Account details: "+res.result);
      // db.close();
    })
    db.collection("userDetails").find({}, {
      _id: false
    }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      // db.close();
    });
    //  });
  });


  //api for checking userlogin
  app.post('/checkUserLogin', function(req, res) {
    console.log(req.body.name);
    //checking for no token
    if ((req.body.token) == null || (req.body.token) == 'undefined' || (req.body.token) == '') {
      console.log("no token");
      //res.redirect('/signingin?name='+req.body.name+'&pwd='+req.body.pwd);
      res.setHeader("Content-Type", "application/json");
      var result = {
        status: true,
        message: "Successfully added"
      };
      // MongoClient.connect(url,function(err,db) {
      //   if (err) throw err;
      //authenticating user in the database
      db.collection("userDetails").find({
        name: req.body.name,
        pwd: req.body.pwd
      }).toArray(function(err, data) {
        if (!err)
          if (data.length != 0) {
            //generating the token
            token = jwt.sign({
              name: req.body.name,
              pwd: req.body.pwd,
              expiresIn: 30 * 30
            }, key);
            console.log("hiiiiii");
            client.on('connect', function() {
              console.log("Connected");
            });
            //storing the token in the redis
            client.set('name', req.body.name);
            client.set('token', token);
            res.json({
              "token": token,
              "status": "newLogin"
            });
            console.log("Token sent is: " + token);
          }
        else {
          res.json({
            "token": null,
            "status": "invalid"
          });
        }
      });

    }
    //checking if the token is there
    else {
      //  console.log("token recieved is: "+req.body.token);
      //  console.log("token is there");
      //  var decode=jwtDecode(req.body.token)
      //  {
      //    console.log("done");
      //    res.json({"token":token, "status": "alreadylogged"});
      //  }
      db.collection("userDetails").find({
        name: req.body.name,
        pwd: req.body.pwd
      }).toArray(function(err, data) {
        if (!err)
          if (data.length != 0) {
            client.exists(req.body.token, function(err, reply) {
              if(err) console.log(err);
              client.exists(req.body.name, function(err, reply) {
                if(err) console.log(err);
                console.log("token recieved is: " +req.body.token);
                console.log("token is there");
                var decode = jwtDecode(req.body.token)
                // {
                  console.log("done");
                  res.json({
                    "token": token,
                    "status": "alreadylogged"
                  });
                // }
              });
              // console.log("token recieved is: " + req.body.token);
              // console.log("token is there");
              // var decode = jwtDecode(req.body.token) {
              //   console.log("done");
              //   res.json({
              //     "token": token,
              //     "status": "alreadylogged"
              //   });
              // }
            });
          }
        else {
          res.json({
            "token": null,
            "status": "invalid"
          });
        }
      });
    }
  });
});




io.on('connection', function(socket) {
  socket.on('chat message', function(obj) {
    var msg = obj.msg;
    var username = obj.username;
    var time = obj.time;
    console.log(msg);
    //console.log(user);
    MongoClient.connect(url, function(err, db) {
      myObj = [{
        message: msg,
        userName: username,
        timeOfMessage: time
      }];
      db.collection("storeMessage").insertMany(myObj, function(err, res) {
        if (err) throw err;
        console.log(user);
        console.log("Message Stored");
        //  db.close();
      })
      db.collection("storeMessage").find({}, {
        _id: false
      }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        //  db.close();
      });
    });
    // if(err) throw err;
    io.sockets.emit('chat message', obj);
    console.log("/////////////////////////////this is " + obj.time);
    //io.emit('username',user);
    //console.log("message: " + msg);
  });
});
//



app.get('/endToken', function(req, res) {
  client.del('token', function(err, reply) {
    console.log("this is logout");
    res.json({
      data: "false"
    })
    console.log("token destroyed Successfully");
  });
});





app.get('/get', function(req, res) {
  console.log(url);
  MongoClient.connect(url, function(err, db) {
    // console.log(db);
    db.collection("storeMessage").find({}, {
      _id: false,
      message: true,
      userName: true,
      timeOfMessage: true
    }).toArray(function(err, data) {
      if (err) throw err;
      // console.log(data);
      res.send(data);
    });
    // db.close();
  })
});



http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});
