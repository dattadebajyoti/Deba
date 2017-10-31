var validators = require("mongoose-validators");
var mongoose = require("mongoose");
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
//model creation
module.exports = mongoose.model('userRegisterSchema', userData);
