/**
 * @description User Controller to handle Web Request
 *
 * @overview
 *
 * User Controller to handle Web Request
 *
 * @file userControllers.js
 * @module UserController User Controller
 */
//requiring the module
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var pug = require('pug');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb");
var db = mongoose.connection;
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('views', './views/pug');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


var cardServices = require('../cardServices/cardServices').cardServices;
var cardServices = new cardServices();

function cardController() {

}

/**
 * @method init() => Init this object
 **/
cardController.prototype.init = function() {}


/***
 * @Method getCard
 * @description List all cards
 ***/

//controller to create user
cardController.prototype.getCard = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.getCard(req, function(err, data) {
    if (err)
      console.log(err);
    // console.log(data);
    res.send(data);
  });
};

//controller to delete a card
cardController.prototype.deleteCard = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.deleteCard(req, function(err, data) {
    if (err)
      console.log(err);
    // console.log(data);
    console.log("note deleted");
  });
};

//controller to edit a card
cardController.prototype.editNote = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.editNote(req, function(err, data) {
    if (err)
      console.log(err);
    // console.log(data);
    console.log("note updated");
  });
};


//controller to set remainder
cardController.prototype.remainder = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.remainder(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.end(data);
    }
  });
};

//controller to trash
cardController.prototype.trash = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.trash(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.end(data);
    }
  });
};


//controller to changeColor
cardController.prototype.changeColour = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.changeColour(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.end(data);
    }
  });
};


//controller to show reaminder data
cardController.prototype.remainderData = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.remainderData(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.send(data);
    }
  });
};


//controller to check pin
cardController.prototype.checkPin = function(req, res, next) {
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
    collaborate: true,
    label: true
  }).toArray(function(err, data) {
    if (err) throw err;
    console.log("status found is:");
    console.log(data);
    res.send(data);
  });
};


//controller to  pin
cardController.prototype.pin = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.pin(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.end(data);
    }
  });
};



//controller to check unpin
cardController.prototype.unpin = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.unpin(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.end(data);
    }
  });
};

//controller to show trash data
cardController.prototype.trashData = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.trashData(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.send(data);
    }
  });
};


//controller to check archived or not
cardController.prototype.checkArchive = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.checkArchive(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      res.send(data);
    }
  });
};


//controller to archive
cardController.prototype.archive = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.archive(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      console.log("note archived")
      res.end(req.body.isArchive);
    }
  });
};


//controller to set location
cardController.prototype.locate = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.locate(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      console.log("location updated");
    }
  });
};


//controller share
cardController.prototype.share = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.share(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      console.log("collaborated");
    }
  });
};

//controller level
cardController.prototype.label = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.label(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      console.log("card labelled");
    }
  });
};

//controller to add_image
cardController.prototype.add_image = function(req, res, next) {
  console.log("in cardcontroller");
  cardServices.add_image(req, function(err, data) {
    if (err)
      console.log(err);
    else {
      console.log("iamge added");
    }
  });
};



//exporting the controller to be used in the routes
module.exports = {
  cardController: cardController
};
