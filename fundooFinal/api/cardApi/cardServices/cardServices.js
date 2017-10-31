/**
 * @description card Services to handle Controller Request
 *
 * @overview
 *
 * card Services to handle Controller Request
 *
 * @file cardServices.js
 * @module cardServices card Services
 */
var cardModel = require('../cardModel/cardModelSchema');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb");
var db = mongoose.connection;

var ObjectId = require('mongodb').ObjectID;
var schedule = require('node-schedule');
const notifier = require('node-notifier');

function cardServices() {

}

/**
 * @method init() => Init this object
 **/
cardServices.prototype.init = function() {}

/***
 * @Method getCard
 * @description displayig the cards
 ***/



cardServices.prototype.getCard = function(req, callback) {
  console.log("In cardServices");
  cardModel.getCard(req, callback);
};


/***
 * @Method deleteCard
 * @description deleting the cards
 ***/

cardServices.prototype.deleteCard = function(req, callback) {
  console.log("In cardServices");
  cardModel.deleteCard(req, callback);
};

/***
 * @Method editNote
 * @description editing the cards
 ***/

cardServices.prototype.editNote = function(req, callback) {
  console.log("In cardServices");
  cardModel.editNote(req, callback);
};


/***
 * @Method remainder
 * @description set remainder
 ***/

cardServices.prototype.remainder = function(req, callback) {
  var date = new Date(req.body.remainder);
  console.log("In cardServices");
  cardModel.remainder(req, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("remainder updated");
    }
  });
  var j = schedule.scheduleJob(date, function() {
    console.log("schedule");
    var myObj = {
      cardId: req.body.noteId
    };
    console.log("myObj is:" + myObj)
    db.collection("noteSchema").findOne(myObj, function(err, res) {
      if (err) {
        callback(err, null);
        throw err;
      } else {
        console.log(res.note);
        notifier.notify('Notifying');
        notifier.notify({
          'title': 'Notification',
          'subtitle': 'Daily Notification',
          'message': res.note,
          'icon': 'dwb-logo.png',
          'contentImage': 'blog.png',
          'sound': 'ding.mp3',
          'wait': true
        });
        callback(null, "ok");
      }
    })
  });
};


/***
 * @Method trash
 * @description  to trash card
 ***/

cardServices.prototype.trash = function(req, callback) {
  console.log("In cardServices");
  cardModel.trash(req, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("trash updated");
    }
  });
  var trashDate = new Date(req.body.year, req.body.month, req.body.date, req.body.hours, req.body.minute, req.body.second);
  var j = schedule.scheduleJob(trashDate, function() {
    console.log("inside trash");
    trashObj = {
      cardId: req.body.trashnote
    };
    console.log(trashObj);
    cardModel.remove(trashObj, function(err, result) {
      if (err) {
        callback(err, null);
        console.log(err);
      } else {
        console.log("Note Deleted");
        console.log(result.deletedCount);
        callback(null, result);
      }
    });;
  });
};



/***
 * @Method changeColor
 * @description change color of the cards
 ***/

cardServices.prototype.changeColour = function(req, callback) {
  console.log("In cardServices");
  cardModel.changeColour(req, callback);
};


/***
 * @Method remainderData
 * @description set remainder for the cards
 ***/

cardServices.prototype.remainderData = function(req, callback) {
  console.log("In cardServices");
  cardModel.remainderData(req, callback);
};


/***
 * @Method pin
 * @description to pin a card
 ***/

cardServices.prototype.pin = function(req, callback) {
  console.log("In cardServices");
  cardModel.pin(req, callback);
};


/***
 * @Method unpin
 * @description to unpin a card
 ***/

cardServices.prototype.unpin = function(req, callback) {
  console.log("In cardServices");
  cardModel.unpin(req, callback);
};


/***
 * @Method trashData
 * @description to show all the trash cards
 ***/

cardServices.prototype.trashData = function(req, callback) {
  console.log("In cardServices");
  cardModel.trashData(req, callback);
};

/***
 * @Method checkArchive
 * @description to check whether a card is archieved or not
 ***/

cardServices.prototype.checkArchive = function(req, callback) {
  console.log("In cardServices");
  cardModel.checkArchive(req, callback);
};

/***
 * @Method archive
 * @description to perform archiving or unarchiving
 ***/

cardServices.prototype.archive = function(req, callback) {
  console.log("In cardServices");
  cardModel.archive(req, callback);
};


/***
 * @Method locate
 * @description to set location
 ***/

cardServices.prototype.locate = function(req, callback) {
  console.log("In cardServices");
  cardModel.archive(req, callback);
};

/***
 * @Method share
 * @description to set share card
 ***/

cardServices.prototype.share = function(req, callback) {
  console.log("In cardServices");
  cardModel.share(req, callback);
};


/***
 * @Method label
 * @description to give level to card
 ***/

cardServices.prototype.label = function(req, callback) {
  console.log("In cardServices");
  cardModel.label(req, callback);
};

/***
 * @Method add_image
 * @description to add image
 ***/

cardServices.prototype.add_image = function(req, callback) {
  console.log("In cardServices");
  cardModel.label(req, callback);
};


module.exports = {
  cardServices: cardServices
};
