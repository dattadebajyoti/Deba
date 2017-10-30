/**
 * @description User Services to handle Controller Request
 *
 * @overview
 *
 * User Services to handle Controller Request
 *
 * @file userUtilityServices.js
 * @module userUtilityServices User Services
 */
//requiring all the modules required for using the email userUtilityServices


function gmailServices() {

}

/**
 * @method init() => Init this object
 **/
gmailServices.prototype.init = function() {}


/***
 * @Method listAllUsers
 * @description List all Users
 ***/


gmailServices.prototype.localSignin = function(res, req, next) {
  var express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var app = express();
  var bodyParser = require("body-parser");
  var authConfig = {
    "google": {
      'clientID': '421900724315-uhqrjtamo1eh1a4mbljargm21ld1bk2h.apps.googleusercontent.com',
      'clientSecret': 'KOsN0_5DH_e5BvT5UHQIs8xf',
      'callbackURL': 'http://localhost:8080/auth/google/callback'
    }
  };
  var session = require('express-session');
  app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.set('views', './views/pug');
  // app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
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
  // app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['openid email profile']
    })
  // );

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

}


module.exports = {
  gmailServices: gmailServices
};
