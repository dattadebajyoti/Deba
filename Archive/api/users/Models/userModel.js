var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String
  }
});

userSchema.statics.findAllUser = function(req,callback){
  this.find({}, function(err, data) {
    if(err)
      callback(err,null)
      // res.send(err);
    callback(null,data);
    // res.json(data);
  });
}


userSchema.statics.createUser = function(req,callback){
  var new_user = new this();
  new_user.name= req.body.name;
  new_user.address= req.body.address;
  new_user.save(function(err, data) {
    if (err)
      callback(err,null)
      // res.send(err);
    // res.json(data);
    callback(null,data);
  });
}



userSchema.statics.updateUser = function(req,callback){
  this.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, function(err, data) {
    if (err)
      callback(err,null)
      // res.send(err);
    // res.json(data);
    callback(null,data);
  });
}


userSchema.statics.deleteUser = function(req,callback){
  this.remove({
    _id: req.body.taskId
  }, function(err, data) {
    if (err)
      {
        // res.send(err);
        callback(err,null);
      }
    // res.json({ message: 'Task successfully deleted' });
    callback(null,data);
  });
}







module.exports = mongoose.model('User', userSchema);
