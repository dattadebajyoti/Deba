var express = require('express');
var router = express.Router();

var UserController = require('../controllers/userController').UserController;
userCntrl = new UserController();
userCntrl.init();

/* GET users listing. */
router.get('/', userCntrl.listAllUsers);
router.post('/createUser',userCntrl.createUser);
router.post('/updateUser',userCntrl.updateUser);
router.post('/deleteUser',userCntrl.deleteUser);
module.exports = router;
