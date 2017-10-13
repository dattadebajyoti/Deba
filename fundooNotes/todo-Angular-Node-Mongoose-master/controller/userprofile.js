/*
 * User profile
 * @path collaborator/userProfile.js
 * @file userProfile.js
 * @Scripted by Ananya Kundu
 */
 'use strict';
/*
 * Module dependencies
 */
var express = require('express'),
    router = express.Router(),
    profileinfo = require('../model/userSchema');
var winston = require('winston');

/* POST call to get profile is available  or not */
router.post('/', function(req,res){
  try {
    var uid = req.decoded.id;

    profileinfo.getUserProfile(uid,function(err,result){
          try {
            if(err)  {
                winston.error('User profile is not available');
                res.send({ "status": true, "message": "user profile is not available"});
              }
            else {
                winston.info('User profile is available');
                res.send({"status": false,"message": "user profile available","userinfo":result});
              }
            }
            catch (e){
                res.send({"status": false,"message": "server error"});
              }
    });
  }catch (e){
      winston.systemError('Server error on user profile');
      res.send({"status": false,"message": "server error"});
    }

});
module.exports = router;
