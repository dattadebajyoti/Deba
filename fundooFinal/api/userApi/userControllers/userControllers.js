/**
 * @description User Controller to handle Web Request
 *
 * @overview
 *
 * User Controller to handle Web Request
 *
 * @file userControllers.js
 * @module UserController User Controller
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var pug = require('pug');
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('views','./views/pug');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


var UserServices = require('../userServices/userServices').UserServices;
var userServices = new UserServices();

function UserController() {

}

/**
 * @method init() => Init this object
 **/
UserController.prototype.init = function() {}


/***
 * @Method listAllUsers
 * @description List all Users
 ***/

//controller to create user
UserController.prototype.createUser = function(req, res, next) {
  console.log("in usercontroller");
  userServices.createUser(req, function(err, result) {
    if (err)
      console.log(err);
    console.log(result);
    res.send(result);
  });
};


//controller to sign in an user
UserController.prototype.signInUser = function(req, res, next) {
  console.log("in signInUser");
  userServices.signInUser(req, function(err, result) {
    if (err) {
      console.log(err);
      res.send("true");
    } else {
      console.log("user is: " + req.body.userName);
      req.session.name = req.body.userName;
      console.log(result);
      res.send("false");
    }
  });
};


// controller to check user is logged in
UserController.prototype.checkUserLogin = function(req, res, next) {
  console.log("in check user login");
  var session = req.session;
  console.log(session.name);
  if (session.name) {
    console.log("++++++++++ :" + session.name);
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
};

//controller to end a session
UserController.prototype.endSession = function(req, res, next) {
  console.log("this is logout");
  req.session.destroy(function() {
    res.json({
      data: "false"
    })
    console.log("session ended Successfully");
  })
};

// controller to set password
UserController.prototype.setPwd = function(req, res, next) {
  res.render('setPassword', {
    "result": ""
  })
};

//controller to update
UserController.prototype.update = function(req, res, next) {
  userServices.update(req, function(err, result) {
    console.log("in udpate");
    if(err)
    {
      console.log(err);
    }
    else {
      console.log("updated");
      // res.render('', {
      //   "result": ""
      // });
      res.end("updated");
    }
  });
};


//exporting the controller to be used in the routes
module.exports = {
  UserController: UserController
};
