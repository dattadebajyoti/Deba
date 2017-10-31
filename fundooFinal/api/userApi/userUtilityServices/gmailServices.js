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
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nodemailer = require("nodemailer");
var express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();

function gmailServices() {

}

/**
 * @method init() => Init this object
 **/
gmailServices.prototype.init = function() {}


/***
 * @Method localSignin
 * @description enable local login for an user
 ***/


gmailServices.prototype.localSignin = function(res, req, next) {
  
  // console.log('gmaillogin')
  // app.get('/', function(req, res) {
  //   res.render('index', {
  //     user: req.user
  //   });
  // });

  // app.get('/login', function(req, res) {
  //   res.render('login', {
  //     user: req.user
  //   });
  // });

  // app.get('/auth/google',
  //   passport.authenticate('google'),
  //   function(req, res){
  //     // The request will be redirected to Google for authentication, so
  //     // this function will not be called.
  //   });
  // app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['openid', 'email', 'profile']
    });
  // );

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.
  


}


module.exports = {
  gmailServices: gmailServices
};
