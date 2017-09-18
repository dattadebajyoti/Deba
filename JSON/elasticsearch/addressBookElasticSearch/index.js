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
      /*.then(response => {
        console.log("ok");
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
        console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
      })
      .catch(console.err);*/
  };
  const test = function test() {
    const articlesRaw = fs.readFileSync('filename.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('library', 'article', articles);
  };
  setTimeout(function () {
      test();
  },2000);

  module.exports = {
    bulkIndex
  };
}());
