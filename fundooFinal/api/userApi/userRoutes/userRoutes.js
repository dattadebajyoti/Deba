/* Requiring the express  */

var express = require('express');
var router = express.Router();

console.log("in user routes");

/* requiring the user controller*/
var UserController = require('../userControllers/userControllers').UserController;
userCntrl = new UserController();
userCntrl.init();

/* require the forgot Services */
var forgotPasswordServices = require('../userUtilityServices/forgotPassword').forgotPasswordServices;
forgotPwd = new forgotPasswordServices();
forgotPwd.init();

/* require the gmail services */
var userGmailServices = require('../userUtilityServices/gmailServices').gmailServices;
gmailUtility = new userGmailServices();
gmailUtility.init();




/* GET users listing. */
/* specifying all the user routes. */
router.post('/inserting', userCntrl.createUser);
router.post('/signingin', userCntrl.signInUser);
router.get('/checkUserLogin', userCntrl.checkUserLogin);
router.get('/endSession', userCntrl.endSession);
router.post('/forgotPassword',forgotPwd.forgotPassword);
router.get('/setPwd',userCntrl.setPwd);
router.post('/updating',userCntrl.update);
module.exports = router;
