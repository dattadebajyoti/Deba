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
var ObjectId = require('mongodb').ObjectID;
var uniqid = require('uniqid');
var schedule = require('node-schedule');
const notifier = require('node-notifier');
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
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb");
var db = mongoose.connection;
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

var cardData = Schema({
  cardId: {
    type: String
  },
  userId: {
    type: String
  },
  timeOfCreation: {
    type: String
  },
  note: {
    type: String
  },
}, {
  collection: "userCardSchema"
});
//model creation
var cardData = mongoose.model('userCardSchema', cardData);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//converting to html once the root is hit and redirecting to root url
app.get('/', function(req, res) {
  res.render('index', {
    "result": ""
  })
});
//converting to html and redirecting to chat page once the chatApp api is hit
app.get('/chat', function(req, res) {
  res.render('chatApp', {
    "result": ""
  })
});
//converting to html and redirecting to login page once the logBack api is hit
app.get('/logBack', function(req, res) {
  res.render('index', {
    "result": ""
  })
});

app.use("/", express.static('./sample/'));

app.post("/inserting", (req, res) => {
  var result = {
    status: true,
    message: "Successfully added"
  };
  res.setHeader('Content-Type', 'application/json');
  var myData = new userData({
    'local.userName': req.body.userName,
    'local.mobileNo': req.body.mobileNo,
    'local.email': req.body.email,
    'local.password': req.body.password
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
    } else {
      res.json({
        data: "true"
      });
    }
  });
});





// var url = "mongodb://localhost:27017/mydb";
io.on('connection', function(socket) {
  socket.on('chat message', function(obj) {
    // var msg = obj.msg;
    var note = obj.msg;
    var username = obj.username;
    var time = obj.time;
    console.log(note);
    //console.log(user);
    // mongoose.connect(url, function(err, db) {
    //++++++++++++++++++++++++++++
    // myObj = [{
    //   message: msg,
    //   userName: username,
    //   timeOfMessage: time
    // }];
    // db.collection("storeMessage").insertMany(myObj, function(err, res) {
    //   if (err) throw err;
    //   // console.log(user);
    //   console.log("Message Stored");
    //   //  db.close();
    // })
    // db.collection("storeMessage").find({}, {
    //   _id: false
    // }).toArray(function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   //  db.close();
    // });
    //-------------------------------
    var id = uniqid();
    var noteData = new cardData({
      'cardId': id,
      'userId': username,
      'timeOfCreation': time,
      'note': note
    });
    console.log(noteData);
    noteData.save(function(err) {
      if (err) console.log(err);
      else {
        console.log("item saved to the database");
      }
    });
    //--------------------------------

    //+++++++++++++++++++++++++++
    // });
    // if(err) throw err;
    io.sockets.emit('chat message', noteData);
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

//api to delete a note
app.post('/deleteCard', function(req, res) {
  console.log("ok+++++++++++");
  console.log("This is: " + req.body.deleteNote);
  db.collection("cardData").deleteOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("Note Deleted");
  });
});

//api to editNote
app.post('/editNote', function(req, res) {
  console.log(req.body);
  var myquery = {
    cardId: req.body.noteId
  };
  db.collection("userCardSchema").updateOne(myquery, req.body, function(err, res) {
    if (err) throw err;
    console.log("note updated");
  })
})

//api for remainder
app.post('/remainder', function(req, res) {
// console.log(req.body);
console.log("hi");
var date = new Date(2017, 9, 10, 18, 58, 0);
console.log(date);
var j = schedule.scheduleJob(date, function() {
  console.log("schedule");
  var myObj = {
    // cardId: req.body.noteId,
    // remainder: req.body.remainder
    cardId: "8d2ej8lgpc7d"
  };
  console.log(myObj)
  db.collection("userCardSchema").findOne(myObj, function(err, res) {
    if (err) throw err;
    notifier.notify('Notifying');
    notifier.notify({
      'title': 'Notification',
      'subtitle': 'Daily Notification',
      'message': res.note,
      'icon': 'dwb-logo.png',
      'contentImage': 'blog.png',
      'sound': 'ding.mp3',
      'wait': true
    });
  })
  // .toArray(function(err,data) {
    // notifier.notify('Notifying');
    // notifier.notify({
    //   'title': 'Notification',
    //   'subtitle': 'Daily Notification',
    //   'message': 'data.note',
    //   'icon': 'dwb-logo.png',
    //   'contentImage': 'blog.png',
    //   'sound': 'ding.mp3',
    //   'wait': true
    // });
  // });
  res.end("ok");
 });
});

//api for trash
app.post('/trash', function(req, res) {
  console.log("ok is:" + req.body.minute);
  var x = parseInt(req.body.minute) + 2;
  console.log(x);
  var trashDate = new Date(req.body.year, req.body.month, req.body.date, req.body.hours, req.body.minute, req.body.second);
  console.log(trashDate);
  var j = schedule.scheduleJob(trashDate, function() {
    trashObj = {
      cardId: req.body.trashnote
    };
    console.log(trashObj);
    db.collection("userCardSchema").deleteOne(trashObj, function(err, result) {
      if (err) console.log(err);
      console.log("Note Deleted");
      console.log(result.deletedCount);
    });
    console.log('deleted');
    res.end("ok");
  });
});



//making to listen at port number 3004
http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});
