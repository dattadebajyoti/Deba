/**
 * @description User Controller to handle Web Request
 *
 * @overview
 *
 * User Controller to handle Web Request
 *
 * @file userController.js
 * @module UserController User Controller
 *
 * @author Narayan <narayan@bridgelabz.com>
 * @copyright Copyright 2017 Bridgelabz <admin@bridgelabz.com>
 */

var UserServices = require('../services/userServices').UserServices;
var userServices = new UserServices();

function UserController() {

}

/**
 * @method init() => Init this object
 **/
UserController.prototype.init = function() {
}


/***
 * @Method listAllUsers
 * @description List all Users
 ***/

UserController.prototype.listAllUsers = function (req, res, next) {
    userServices.listAllUsers(req, function(err,result) {
      if(err)
      console.log(err);
      console.log(result);
      res.send(result);
    });
    //res.send("Testing");
};


UserController.prototype.createUser = function (req, res, next) {
    userServices.createUser(req, function(err,result) {
      if(err)
      console.log(err);
      console.log(result);
      res.send(result);
    });
    //res.send("Testing");
};

UserController.prototype.updateUser = function (req, res, next) {
    userServices.updateUser(req, function(err,result) {
      if(err)
      console.log(err);
      console.log(result);
      res.send(result);
    });
    //res.send("Testing");
};



UserController.prototype.deleteUser = function (req, res, next) {
    userServices.deleteUser(req, function(err,result) {
      if(err)
      console.log(err);
      console.log(result);
      res.send(result);
    });
    //res.send("Testing");
};




module.exports = {
    UserController: UserController
};
