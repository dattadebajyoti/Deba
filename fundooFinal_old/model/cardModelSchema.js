var validators = require("mongoose-validators");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
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
//model creation
var cardData = mongoose.model(cardData, cardDataSchema,'noteSchema');
module.exports = cardData;
