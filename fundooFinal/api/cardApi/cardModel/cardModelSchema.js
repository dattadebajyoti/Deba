/*
requiring all the modules
 */

var validators = require("mongoose-validators");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb");
var db = mongoose.connection;
var schedule = require('node-schedule');
const notifier = require('node-notifier');
var fs = require('fs-extra');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({
  storage: storage
}).single('userPhoto');
//defining the card schema
var cardDataSchema = new Schema({
  cardId: {
    type: String
  },
  userId: {
    type: String
  },
  timeOfCreation: {
    type: String
  },
  note: {
    type: String
  },
  remainder: {
    type: String
  },
  color: {
    type: String
  },
  trash: {
    type: String
  },
  pin: {
    type: String
  },
  pinColor: {
    type: String
  },
  isArchive: {
    type: String
  },
  title: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  collaborate: {
    type: String
  },
  label: {
    type: String
  }
}, {
  collection: "noteSchema"
});

//function to get all the cards for a given user
cardDataSchema.statics.getCard = function(req, callback) {
  console.log("ingetdata:" + req.body.userid);
  // var myObj={ userId: req.body.userid };
  var myObj = {
    $or: [{
      "userId": req.body.userid
    }, {
      "collaborate": req.body.userid
    }]
  };
  console.log(myObj);
  db.collection("noteSchema").find(myObj, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note: true,
    remainder: true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) {
      throw err;
      callback(err, null);
    } else {
      console.log("hii");
      callback(null, data);
    }

    // console.log(data);
    // res.send(data);
  });
  // db.close();
  // })
}


//function to delete cards for a given user
cardDataSchema.statics.deleteCard = function(req, callback) {
  console.log("ok+++++++++++");
  console.log("This is: " + req.body.deleteNote);
  this.remove({
    cardId: req.body.deleteNote
  }, function(err, res) {
    if (err) {
      throw err;
      callback(err, null);
    } else {
      console.log(res);
      console.log("Note Deleted");
      callback(null, res);
    }
  });
}


//function to edit a card

cardDataSchema.statics.editNote = function(req, callback) {
  console.log(req.body);
  var myquery = {
    cardId: req.body.noteId
  };
  this.findOneAndUpdate(myquery, req.body, function(err, res) {
    if (err) {
      throw err;
      callback(err, null);
    } else {
      console.log("note updated");
      callback(null, res);
    }
  })
}


//function to set the remainder
cardDataSchema.statics.remainder = function(req, callback) {
  var date = new Date(req.body.remainder);
  var myquery = {
    cardId: req.body.noteId
  }
  this.findOneAndUpdate(myquery, {
    remainder: date
  }, {
    upsert: true
  }, function(err, res) {
    if (err) {
      throw err;
      callback(err, null);
    } else {
      console.log("remainder updated");
      callback(null, res);
    }
  })
}


//function to trash
cardDataSchema.statics.trash = function(req, callback) {
  console.log("ok is:" + req.body.minute);
  var x = parseInt(req.body.minute) + 2;
  console.log(x);
  var trashDate = new Date(req.body.year, req.body.month, req.body.date, req.body.hours, req.body.minute, req.body.second);
  console.log(trashDate);
  this.findOneAndUpdate({
    cardId: req.body.trashnote
  }, {
    trash: trashDate
  }, {
    upsert: true
  }, function(err, result) {
    if (err) {
      throw err;
      callback(err, null);
    } else {
      console.log("trash date updated");
      callback(null, result);
    }
  })
}



//function to change color
cardDataSchema.statics.changeColour = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    color: req.body.color
  };
  this.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      callback(null, result);
    }
  })
}



// function to show all the remainder database
cardDataSchema.statics.remainderData = function(req, callback) {
  var myquery = {
    userId: req.body.username,
    remainder: {
      $ne: "Invalid Date "
    }
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note: true,
    remainder: true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) callback(err, null);
    else {
      console.log("hii");
      console.log(data);
      callback(null, data);
    }
  });
}


//function to pin a card
cardDataSchema.statics.pin = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    pin: req.body.pin
  };
  this.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      console.log("note pinned");
      callback(null, "pinned");
    }
  })
}

//function to unpin a card
cardDataSchema.statics.unpin = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    pin: req.body.pin
  };
  this.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      console.log("note unpinned");
      callback(null, "unpinned");
    }
  })
}

//function to show trashed cards
cardDataSchema.statics.trashData = function(req, callback) {
  var myquery = {
    userId: req.body.username,
    trash: "true"
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note: true,
    remainder: true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) callback(err, null);
    else {
      console.log("hii");
      console.log(data);
      callback(null, data);
    }
  });
}


//function to check archived cards
cardDataSchema.statics.checkArchive = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  db.collection("noteSchema").find(myquery, {
    _id: false,
    cardId: true,
    userId: true,
    timeOfCreation: true,
    note: true,
    remainder: true,
    color: true,
    trash: true,
    pin: true,
    pinColor: true,
    isArchive: true,
    title: true,
    latitude: true,
    longitude: true,
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) callback(err, null);
    else {
      console.log("hii");
      console.log(data);
      callback(null, data);
    }
  });
}


//function to archive/unarchive
cardDataSchema.statics.archive = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    isArchive: req.body.isArchive
  };
  this.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      console.log("note archived");
      callback(null, result);
    }
  })
}

//function to set location
cardDataSchema.statics.locate = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  this.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      console.log("location updated");
      callback(null, result);
    }
  })
}


//function to share card
cardDataSchema.statics.share = function(req, callback) {
  var myquery = {
    cardId: req.body.noteId
  };
  var newvalue = {
    collaborate: req.body.userId
  };
  this.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      callback(null, result);
    }
  })
}

//function to label card
cardDataSchema.statics.label = function(req, callback) {
  var myquery = {
    cardId: req.body.cardId
  };
  // console.log(myquery);
  var newvalue = {
    label: req.body.label
  };
  cardModel.findOneAndUpdate(myquery, newvalue, {
    upsert: true
  }, function(err, result) {
    if (err) callback(err, null);
    else {
      callback(null, result);
    }
  })
}

//function to add image
cardDataSchema.statics.add_image = function(req, callback) {
  console.log("in upload images");
  upload(req, res, function(err, result) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log(result);
      callback(null, data);
    }
  });
}



//model creation
var cardData = mongoose.model(cardData, cardDataSchema, 'noteSchema');
module.exports = cardData;
