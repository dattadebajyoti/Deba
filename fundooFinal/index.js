var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

(function() {
  'use strict';

  const fs = require('fs');
  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log:"error"
  });


  const bulkIndex = function bulkIndex(index, type, data) {

    let bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type
        }
      });

      bulkBody.push(item);
    });
    console.log(bulkBody);
    var promise = esClient.bulk({
        body: bulkBody
      },function (err,data) {
        console.log(JSON.stringify([err,data],0,4));
        esClient.close()
      });
  };
  const test = function test() {
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("noteSchema").find({}).toArray(function(err, result) {
      if (err) throw err;
      var body=[];
      result.forEach(function(item) {
        // body.push({ "index": {"_index": notedata, "_type": note}});
        body.push({ note: item.note, cardId: item.cardId, userId: item.userId, timeOfCreation: item.timeOfCreation, remainder: item.remainder, color: item.color, trash: item.trash, pin: item.pin, pinColor: item.pinColor, isArchive:item.isArchive, title: item.title });
      })
      console.log(body);
      // console.log("in the json "+JSON.stringify(json));
      bulkIndex('notedata', 'note',body);
      db.close();
    });
  });

  };
  setTimeout(function () {
      test();
  },2000);

  module.exports = {
    bulkIndex
  };
}());
