//requiring the express module
var express = require("express");
//requiring body parser to
var bodyParser = require("body-parser");
//setting the path
var path = require("path");
//creating an object for express
var app = express();


//requiring the user and card schema
var userModel = require("./model/userModelSchema");
var cardModel = require("./model/cardModelSchema");
//
var fs = require('fs-extra');
var multer	=	require('multer');
// var storage	=	multer.diskStorage({
//   destination: function (req, file, callback) {
//     console.log("in destination "+file);
//     var path = './imageUploads';
//     fs.mkdirSync(path);
//     callback(null, path);
//   },
//   filename:(req, file, callback) => {
//     console.log("field is"+file.field);
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
// var upload = multer({ storage : storage}).single('userPhoto');
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');



var request = require('request');
var cheerio = require('cheerio');
var validUrl = require('valid-url');
//requiring the fs module
var fs = require('fs');
//requiring the http module to connect to the server
var http = require('http').Server(app);
//requiring the socket module
var io = require('socket.io')(http);
//setting the port to listen
var PORT = process.env.PORT || 8080;
//require pug
var redis = require('redis');
var client = redis.createClient({
  host: 'localhost',
  port: 6379
});
var pug = require('pug');
//app.use(bodyParser.json());
var ObjectId = require('mongodb').ObjectID;
var uniqid = require('uniqid');
var schedule = require('node-schedule');
const notifier = require('node-notifier');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "debajyoti95datta@gmail.com",
        pass: "abcd"
    }
});
smtpTransport.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});
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

const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});



var validators = require("mongoose-validators");
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb");
var db = mongoose.connection;



app.set('views','./views/pug');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/', function(req, res) {
  res.render('index', {
    "result": ""
  })
});
app.get('/fundoo', function(req, res) {
  res.render('fundooNote', {
    "result": ""
  })
});
app.get('/logBack', function(req, res) {
  res.render('index', {
    "result": ""
  })
});

app.use("/",express.static('./views'));
// app.use("/",express.static('./js'));
// app.use("/",express.static('./views/pug'));
// app.use("/",express.static('./images/js'));

app.post("/inserting", (req, res) => {
  var result = {
    status: true,
    message: "Successfully added"
  };
  res.setHeader('Content-Type', 'application/json');
  var myData = new userModel({
    'local.userName': req.body.userName,
    'local.mobileNo': req.body.mobileNo,
    'local.email': req.body.email,
    'local.password': req.body.password,
    'local.facebookUser': req.body.facebookUser
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



    var Title, release, rating;
    var getTitle;
    var json = { Title : "", release : "", rating : ""};

    var text=obj.msg;


    if (validUrl.isUri(note)) {
        console.log('Looks like an URI');

        request(note, function(error, response, html){
          if(!error){
            console.log("error");
            var $ = cheerio.load(html);
            $('.title_wrapper').filter(function(){
              var data = $(this);
              Title = data.children().first().text().trim();
              release = data.children().last().children().last().text().trim();
              getTitle = Title;
              console.log(JSON.stringify(getTitle));
              json.title = Title;
              json.release = release;
            })

            $('.ratingValue').filter(function(){
              var data = $(this);
              rating = data.text().trim();

              json.rating = rating;
            })
          }
          fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
          })
          var id = uniqid();
          var noteData = new cardModel({
            'cardId': id,
            'userId': username,
            'timeOfCreation': time,
            'note': note,
            'remainder': obj.remainder,
            'color' : obj.color,
            'trash' : "false",
            'pin' : "false",
            'pinColor': "black",
            'isArchive': "false",
            'title': getTitle,
            'latitude': " ",
            'longitude': " ",
            'collaborate': " ",
            'label': " "
          });
          console.log(noteData);
          noteData.save(function(err,res) {
            if (err) console.log(err);
            else {
              console.log("item saved to the database");
              console.log(res);
            }
          });
          io.sockets.emit('get message', noteData);
        })
      }
      else {
        getTitle = " ";
        console.log("getTitle is: "+getTitle);
        var id = uniqid();
        var noteData = new cardModel({
          'cardId': id,
          'userId': username,
          'timeOfCreation': time,
          'note': note,
          'remainder': obj.remainder,
          'color' : obj.color,
          'trash' : "false",
          'pin' : "false",
          'pinColor': "black",
          'isArchive': "false",
          'title': getTitle,
          'latitude': " ",
          'longitude': " ",
          'collaborate': " ",
          "label": " "
        });
        console.log(noteData);
        noteData.save(function(err,res) {
          if (err) console.log(err);
          else {
            console.log("item saved to the database");
            console.log(res);
          }
        });
        io.sockets.emit('get message', noteData);
      }
  });
});





//api checkUserLogin
app.get('/checkUserLogin', function(req, res) {
  console.log("this is checkUserLogin");
  var session = req.session;
  console.log(session.name);
  if (session.name) {
    console.log("++++++++++ :"+session.name);
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
app.post('/getdata', function(req, res) {
  // console.log(url);
  // MongoClient.connect(url, function(err, db) {
  // console.log(db);
  console.log("ingetdata:"+req.body.userid);
  // var myObj={ userId: req.body.userid };
  var myObj={$or:[{"userId":req.body.userid},{"collaborate":req.body.userid}]};
  console.log(myObj);
  db.collection("noteSchema").find(myObj, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note:true,
    remainder:true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) throw err;
    console.log("hii");
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
  cardModel.remove({cardId: req.body.deleteNote}, function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log("Note Deleted");
  });
});

//api to editNote
app.post('/editNote', function(req, res) {
  console.log(req.body);
  var myquery = {
    cardId: req.body.noteId
  };
  db.collection("noteSchema").updateOne(myquery, req.body, function(err, res) {
    if (err) throw err;
    console.log("note updated");
  })
})

//api for remainder
app.post('/remainder', function(req, res) {
console.log("inside the remainder api:"+req.body.remainder);
console.log("hi");
var date = new Date(req.body.remainder);
var myquery={
  cardId: req.body.noteId
}
cardModel.findOneAndUpdate(myquery, {remainder: date},{upsert:true}, function(err, res) {
  if (err) throw err;
  console.log("note updated");
})
console.log("this is date in remainder:"+date);
var j = schedule.scheduleJob(date, function() {
  console.log("schedule");
  var myObj = {
    cardId: req.body.noteId
    // remainder: req.body.remainder
    // cardId: "8d2ej8lgpc7d"
  };
  console.log("myObj is:"+myObj)
  db.collection("noteSchema").findOne(myObj, function(err, res) {
    if (err) throw err;
    console.log(res.note);
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
  cardModel.findOneAndUpdate({cardId: req.body.trashnote}, {trash: trashDate}, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("color updated");
  })
  var j = schedule.scheduleJob(trashDate, function() {
    trashObj = {
      cardId: req.body.trashnote
    };
    console.log(trashObj);
    cardModel.remove(trashObj, function(err, result) {
      if (err) console.log(err);
      console.log("Note Deleted");
      console.log(result.deletedCount);
    });
    console.log('deleted');
    res.end("ok");
  });
});

//=====================================================================

var express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var authConfig = {
  "google": {
    'clientID': '421900724315-uhqrjtamo1eh1a4mbljargm21ld1bk2h.apps.googleusercontent.com',
    'clientSecret': 'KOsN0_5DH_e5BvT5UHQIs8xf',
    'callbackURL': 'http://localhost:8080/auth/google/callback'
  },
  "facebookAuth" : {
    'clientID'      : '126273234757977', //App ID
    'clientSecret'  : 'd1ce9c4e4bcfe41b8d0f651f7c777c7b', //App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },
};
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy(
  authConfig.google,
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy(
  authConfig.facebookAuth,
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

var logger = require('morgan');
var cookieParser = require('cookie-parser');
app.use(logger('dev'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['openid email profile']
  }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/account',
    failureRedirect: '/'
  }),
  function(req, res) {
    // Authenticated successfully
    res.redirect('/');
  });

app.get('/account', ensureAuthenticated, function(req, res) {
  console.log("details:"+req.user.emails[0].value);
  // setUserName=req.user.emails[0].value;
  var setUserName;
  var query = { 'local.email': req.user.emails[0].value };
  userModel.find(query, function(err, result) {
    if (err) console.log(err);
    console.log(result);
    console.log("inside mongo in ac:  "+result[0].local.userName);
    setUserName=result[0].local.userName;
    console.log("session set is:"+setUserName);
    req.session.name = setUserName;
    console.log("session set is:"+req.session.name);
    res.render('fundooNote', {
      user: req.user
    });
  });
});


// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}



//=====================================================================
//login using facebook
//
//
    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user.displayName);
        var setUserName;
        var query = { 'local.facebookUser': req.user.displayName };
        userModel.find(query, function(err, result) {
          if (err) console.log(err);
          console.log(result);
          console.log("inside mongo in ac:  "+result[0].local.userName);
          setUserName=result[0].local.userName;
          console.log("session set is:"+setUserName);
          req.session.name = setUserName;
          console.log("session set is:"+req.session.name);
          res.render('fundooNote', {
            user: req.user
          });
        });
    });
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}










//=====================================================================


app.post('/changeColour',function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    color: req.body.color
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("color updated");
  })
});


app.post('/trashData',function(req,res) {
  var myquery = {
    userId: req.body.username,
    trash: "true"
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note:true,
    remainder:true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) throw err;
    console.log("hii");
    console.log(data);
    res.send(data);
  });
});



app.post('/remainderData',function(req,res) {
  var myquery = {
    userId: req.body.username,
    remainder: { $ne: "Invalid Date "}
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note:true,
    remainder:true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) throw err;
    console.log("hii");
    console.log(data);
    res.send(data);
  });
});


app.post('/checkPin',function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note:true,
    remainder:true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) throw err;
    console.log("status found is:");
    console.log(data);
    res.send(data);
  });
});




app.post('/pin',function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    pin: req.body.pin
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("note pinned");
    // console.log(result);
    res.end("pinned");
  })
});




app.post('/unpin',function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    pin: req.body.pin
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("note unpinned");
    // console.log(result);
    res.end("unpinned");
  })
})



app.post('/checkArchive',function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note:true,
    remainder:true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) throw err;
    console.log("status found is:");
    console.log(data);
    res.send(data);
  });
});




app.post('/archive',function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    isArchive: req.body.isArchive
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("note archived");
    // console.log(result);
    res.end("unarchived");
  })
})



app.post('/forgotPassword',function(req,res) {
  // console.log(req.body.email);
    var link= "http://localhost:8080/setPwd";
    var myObj = {
      'local.email': req.body.email
    };
    console.log(myObj);
    // db.collection("userRegisterSchema").findOne(myObj, (err, res) => {
      // if (err) console.log(err);
      var mailOptions={
        to : req.body.email,
        subject : "verify link",
        text : link
     }
     smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
          console.log(error);
          // response.end("error");
        } else {
            console.log("Message sent: " + response);
            // response.end("sent");
          }
     });
    // })
})



app.get('/setPwd', function(req, res) {
  res.render('setPassword', {
    "result": ""
  })
});


app.post('/updating', function(req, res) {
  var myquery = {
    'local.email': req.body.useremail
  };
  var newvalue = {
    'local.password': req.body.password
  }
  db.collection("userRegisterSchema").updateOne(myquery, newvalue, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    // res.send("updated");
  });
});



//api to set location
app.post('/locate', function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("location updated");
  })
});



//api to elastic search
app.post('/searchByNote', function(req, res) {
  var noteDetails=[];
  console.log("Name is: " + req.body.search);
  var result = {
    status: true,
    message: "Successfully added"
  };
  //setting the header
  res.setHeader('Content-Type', 'application/json');
  const search = function search(index, body) {
    return esClient.search({
      index: index,
      body: body
    });
  };
  // all calls should be initiated through the module
  const elasticSearch = function elasticSearch() {
    let body = {
      size: 20,
      from: 0,
      query: {
        multi_match: {
          query: req.body.search,
          fields: ['note']
        }
      }
    };
    //printing the matched values
    console.log(`retrieving documents whose note  match '${body.query.multi_match.query}' `);
    search('notedata', body)
      .then(results => {
        // console.log(results);
        if (results.hits.total > 0) console.log(`returned notes:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.note} `));
        results.hits.hits.forEach((hit, index) => noteDetails.push({ note: hit._source.note, cardId: hit._source.cardId, userId: hit._source.userId, timeOfCreation: hit._source.timeOfCreation, remainder: hit._source.remainder, color: hit._source.color, trash: hit._source.trash, pin: hit._source.pin, pinColor: hit._source.pinColor, isArchive:hit._source.isArchive, title: hit._source.title }));
        // console.log(noteDetails);
        res.json({"details": noteDetails, "status": "true"});
      })
      .catch(console.error);
  };
  //calling the elasticSearch function
  elasticSearch();
  //exporting the module
  module.exports = {
    search
  };
});




//autocomplete
app.get('/autocomplete', function (req, res) {
    console.log("in autocomplete");
    esClient.search({
        index: "notedata",
        type: "note",
        body: {
            "query": {

                  match: {
                    note: req.query.term
                  }
            }
        }
    }).then(function (resp) {
        var results = resp.hits.hits.map(function(hit){
            return hit._source.note;
        });

        res.send(results);
        console.log(results);
    }, function (err) {
        console.trace(err);
        res.send({response: err.message});
    });
});



//api for collaborator
app.post('/share', function(req,res) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    collaborate: req.body.userId
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) throw err;
    console.log("collaborated");
  })
});


//api for level
app.post('/level', function(req,res) {
  var myquery = {
    cardId: req.body.cardId
  };
  // console.log(myquery);
  var newvalue = {
    label: req.body.label
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {upsert:true}, function(err, result) {
    if (err) console.log(err);
    console.log(result);
    console.log("card labeled");
  })
})


//api to upload images
app.post('/api/photo',function(req,res){
  console.log("in upload images");
	upload(req,res,function(err,result) {
		if(err) {
      console.log(err);
			return res.end("Error uploading file.");
		}
    console.log(result);
		res.end("File is uploaded");
	});
});



//making to listen at port number 3004
http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});
