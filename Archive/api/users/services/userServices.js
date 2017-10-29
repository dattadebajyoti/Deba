/**
 * @description User Services to handle Controller Request
 *
 * @overview
 *
 * User Services to handle Controller Request
 *
 * @file userServices.js
 * @module UserServices User Services
 *
 * @author Narayan <narayan@bridgelabz.com>
 * @copyright Copyright 2017 Bridgelabz <admin@bridgelabz.com>
 */
var userModel = require('../Models/userModel')
function UserServices() {

}

/**
 * @method init() => Init this object
 **/
UserServices.prototype.init = function() {
}

/***
 * @Method listAllUsers
 * @description List all Users
 ***/

UserServices.prototype.listAllUsers = function (req, callback) {
    console.log("In UserServices listAllUsers");
    userModel.findAllUser(req, callback);
};


UserServices.prototype.createUser = function (req, callback) {
    console.log("In UserServices listAllUsers");
    userModel.createUser(req, callback);
};


UserServices.prototype.updateUser = function (req, callback) {
    console.log("In UserServices listAllUsers");
    userModel.updateUser(req, callback);
};


UserServices.prototype.deleteUser = function (req, callback) {
    console.log("In UserServices listAllUsers");
    userModel.deleteUser(req, callback);
};




module.exports = {
    UserServices: UserServices
};
