var validators = require("mongoose-validators");
var mongoose = require("mongoose");
var db = mongoose.connection;
var Schema = mongoose.Schema;
var userData = Schema({
  local: {
    userName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      validate: validators.isAlpha()
    },
    mobileNo: {
      type: Number,
      min: 10
    },
    email: {
      type: String,
      validate: validators.isEmail()
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 100
    },
    facebookUser: {
      type: String
    }
  },

}, {
  collection: "userRegisterSchema"
});

/***
 * @Method crud operations
 * @description various crud functions
 ***/

userData.statics.createUser = function(req, callback) {
  console.log(req.body);
  var myData = new this();
  myData.local.userName = req.body.userName;
  myData.local.mobileNo = req.body.mobileNo;
  myData.local.email = req.body.email;
  myData.local.password = req.body.password;
  myData.local.facebookUser = req.body.facebookUser;
  myData.save(function(err, data) {
      if (err)
        callback(err, null)
      callback(null, data);
    })
    .then(item => {
      console.log("data saved to databse");
    })
    .catch(err => {
      console.log("unable to save to database");
    });
}

userData.statics.signInUser = function(req, callback) {
  db.collection("userRegisterSchema").find({
    'local.userName': req.body.userName,
    'local.password': req.body.password
  }).toArray(function(err, data) {
    if (err)
      callback(err, null);
    callback(null, data);
    if (!err)
      console.log(data.length)
    if (data.length != 0) {
      console.log("ok");
      // req.session.name = req.body.userName;
      user = req.body.name;
      console.log("hiii");
      // res.json({
      //   data: "false"
      // });
    } else {
      // res.json({
      //   data: "true"
      // });
    }
  });
}

userData.statics.update = function(req, callback) {
  console.log("inside the update function");
  var myquery = {
      'local.email' : req.body.useremail
    };
  var newvalue = {
      password : req.body.password
    }
    console.log(newvalue);
    db.collection("userRegisterSchema").updateOne(myquery, newvalue, function(err, res) {
      if (err) callback(err,null);
      callback(null,res);
      db.close();
      // res.send("updated");
    });
}


//model creation
var userData = mongoose.model('userRegisterSchema', userData);
module.exports = userData;
