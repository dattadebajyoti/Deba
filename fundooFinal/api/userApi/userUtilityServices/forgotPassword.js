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
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "debajyoti95datta@gmail.com",
        pass: "ai3333###"
    }
});
smtpTransport.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});


function forgotPasswordServices() {

}

/**
 * @method init() => Init this object
 **/
forgotPasswordServices.prototype.init = function() {}


/***
 * @Method listAllUsers
 * @description List all Users
 ***/

//controller to create user
forgotPasswordServices.prototype.forgotPassword = function(req, res, next) {
  console.log("in forgotPassword");
  var link= "http://localhost:8080/userApi/setPwd";
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
};


//exporting the forgot password utility to be used in the routes
module.exports = {
  forgotPasswordServices: forgotPasswordServices
};
