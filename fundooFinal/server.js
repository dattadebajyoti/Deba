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
var PORT = process.env.PORT || 3011;
//require pug
var pug = require('pug');
//app.use(bodyParser.json());
//requiring the sesion module

var session = require('express-session');
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

var validators = require("mongoose-validators");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb");
var db=mongoose.connection;
var userData = Schema({
  local: {
    userName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      validate: validators.isAlpha()
    },
    mobileNo: {
      type: Number,
      min: 10
    },
    email: {
      type: String,
      validate: validators.isEmail()
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 100
    },
  },

}, {
  collection: "userRegisterSchema"
});
//model creation
var userData = mongoose.model('userRegisterSchema', userData);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//converting to html once the root is hit and redirecting to root url
app.get('/', function (req, res) {
    res.render('index', {"result": ""})
});
//converting to html and redirecting to chat page once the chatApp api is hit
app.get('/chat',function (req,res) {
    res.render('chatApp', {"result": ""})
});
//converting to html and redirecting to login page once the logBack api is hit
app.get('/logBack',function (req,res) {
    res.render('index', {"result": ""})
});

app.use("/", express.static('./sample/'));

app.post("/inserting", (req, res) => {
  var result = {
    status: true,
    message: "Successfully added"
  };
  res.setHeader('Content-Type', 'application/json');
  var myData = new userData({
    'local.userName':req.body.userName,
    'local.mobileNo':req.body.mobileNo,
    'local.email'   :req.body.email,
    'local.password':req.body.password
  });
  myData.save()
    .then(item => {
      console.log("data saved to databse");
      res.send(result);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


app.post('/signingin', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var result = {
    status: true,
    message: "Successfully added"
  };
  console.log(req.body.userName);
  db.collection("userRegisterSchema").find({
    'local.userName': req.body.userName,
    'local.password': req.body.password
  }).toArray(function(err, data) {
    if (!err)
      console.log(data.length)
      if (data.length != 0) {
        console.log("ok");
        req.session.name = req.body.userName;
        user = req.body.name;
        console.log("hiii");
        res.json({
          data: "false"
        });
      }
    else {
      res.json({
        data: "true"
      });
    }
  });
});





// var url = "mongodb://localhost:27017/mydb";
io.on('connection', function(socket) {
  socket.on('chat message', function(obj) {
    var msg = obj.msg;
    var username = obj.username;
    var time = obj.time;
    console.log(msg);
    //console.log(user);
    // mongoose.connect(url, function(err, db) {
      myObj = [{
        message: msg,
        userName: username,
        timeOfMessage: time
      }];
      db.collection("storeMessage").insertMany(myObj, function(err, res) {
        if (err) throw err;
        // console.log(user);
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
    // });
    // if(err) throw err;
    io.sockets.emit('chat message', obj);
    console.log("/////////////////////////////this is " + obj.time);
    //io.emit('username',user);
    //console.log("message: " + msg);
  });
});
//
//api checkUserLogin
app.get('/checkUserLogin', function(req, res) {
  var session = req.session;
  if (session.name) {
    //console.log("++++++++++ :"+session.name);
    res.json({
      name: session.name,
      isLogin: true
    });
  } else {
    res.json({
      name: session.name,
      isLogin: false
    });
  }
});
// //
//api to end the session
app.get('/endSession', function(req, res) {
  console.log("this is logout");
  req.session.destroy(function() {
    res.json({
      data: "false"
    })
    console.log("session ended Successfully");
  })
});
//
//
//
//api to get the user details and chat history fromt the database
app.get('/get', function(req, res) {
  // console.log(url);
  // MongoClient.connect(url, function(err, db) {
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
  // })
});


//making to listen at port number 3004
http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});
