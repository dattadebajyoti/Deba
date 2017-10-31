//requiring the express module
var express = require("express");
//requiring body parser to
var bodyParser = require("body-parser");
//setting the path
var path = require("path");
//creating an object for express
var app = express();


var cardModel = require("./api/cardApi/cardModel/cardModelSchema");
var userModel = require("./api/userApi/userModel/userModelSchema");

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

//requiring the session module

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

app.set('views', './views/pug');
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

//making the views folder static so that changes made to it can be comittted
app.use("/", express.static('./views'));


/*
setting the routes
 */
var userRoutes = require('./api/userApi/userRoutes/userRoutes'); //importing user route
app.use('/userApi', userRoutes); //register the route

var cardRoutes = require('./api/cardApi/cardRoutes/cardRoutes'); //importing the card routes
app.use('/cardApi', cardRoutes);



// defining the socket functions to listen the data sent from http
io.on('connection', function(socket) {
  socket.on('chat message', function(obj) {
    // var msg = obj.msg;
    var note = obj.msg;
    var username = obj.username;
    var time = obj.time;
    console.log(note);



    var Title, release, rating;
    var getTitle;
    var json = {
      Title: "",
      release: "",
      rating: ""
    };

    var text = obj.msg;


    if (validUrl.isUri(note)) {
      console.log('Looks like an URI');

      request(note, function(error, response, html) {
        if (!error) {
          console.log("error");
          var $ = cheerio.load(html);
          $('.title_wrapper').filter(function() {
            var data = $(this);
            Title = data.children().first().text().trim();
            release = data.children().last().children().last().text().trim();
            getTitle = Title;
            console.log(JSON.stringify(getTitle));
            json.title = Title;
            json.release = release;
          })

          $('.ratingValue').filter(function() {
            var data = $(this);
            rating = data.text().trim();

            json.rating = rating;
          })
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
          console.log('File successfully written! - Check your project directory for the output.json file');
        })
        var id = uniqid();
        var noteData = new cardModel({
          'cardId': id,
          'userId': username,
          'timeOfCreation': time,
          'note': note,
          'remainder': obj.remainder,
          'color': obj.color,
          'trash': "false",
          'pin': "false",
          'pinColor': "black",
          'isArchive': "false",
          'title': getTitle,
          'latitude': " ",
          'longitude': " ",
          'collaborate': " ",
          'label': " "
        });
        console.log(noteData);
        noteData.save(function(err, res) {
          if (err) console.log(err);
          else {
            console.log("item saved to the database");
            console.log(res);
          }
        });
        io.sockets.emit('get message', noteData);
      })
    } else {
      getTitle = " ";
      console.log("getTitle is: " + getTitle);
      var id = uniqid();
      var noteData = new cardModel({
        'cardId': id,
        'userId': username,
        'timeOfCreation': time,
        'note': note,
        'remainder': obj.remainder,
        'color': obj.color,
        'trash': "false",
        'pin': "false",
        'pinColor': "black",
        'isArchive': "false",
        'title': getTitle,
        'latitude': " ",
        'longitude': " ",
        'collaborate': " ",
        "label": " "
      });
      console.log(noteData);
      noteData.save(function(err, res) {
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



//=====================================================================
var nodemailer = require("nodemailer");
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





//making to listen at port number 3004
http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});
