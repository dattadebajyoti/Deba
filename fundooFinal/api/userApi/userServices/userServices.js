/**
 * @description User Services to handle Controller Request
 *
 * @overview
 *
 * User Services to handle Controller Request
 *
 * @file userServices.js
 * @module UserServices User Services
 */
var userModel = require('../userModel/userModelSchema')

function UserServices() {

}

/**
 * @method init() => Init this object
 **/
UserServices.prototype.init = function() {}

/***
 * @Method createUser
 * @description create an user
 ***/



UserServices.prototype.createUser = function(req, callback) {
  console.log("In UserServices listAllUsers");
  userModel.createUser(req, callback);
};


/***
 * @Method signIn
 * @description signIn an user
 ***/

UserServices.prototype.signInUser = function(req, callback) {
  console.log("In UserServices listAllUsers");
  userModel.signInUser(req, callback);
};


UserServices.prototype.update = function(req, callback) {
  console.log("In set password");
  userModel.update(req, callback);
};

module.exports = {
  UserServices: UserServices
};
