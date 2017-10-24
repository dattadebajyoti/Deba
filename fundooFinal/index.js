(function() {
  'use strict';
  // var mongoose = require('mongoose');
  // mongoose.connect("mongodb://localhost:27017/mydb");
  // var db = mongoose.connection;
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
    const articlesRaw = fs.readFileSync('filename.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('fundooNote', 'note', notes);
    })
  };
  setTimeout(function () {
      test();
  },2000);

  module.exports = {
    bulkIndex
  };
}());
