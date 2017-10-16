//requiring the express module
var express = require("express");
//requiring bodyparser to pass values through http
var bodyParser = require("body-parser");
//requiring the path
var router = express.Router();
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});
app.get('/autocomplete', function (req, res) {
    console.log("deba");
    esClient.search({
        index: "library",
        type: "article",
        body: {
            "query": {

                  match: {
                    note: req.query.term
                  }
            }
        }
    }).then(function (resp) {


        var results = resp.hits.hits.map(function(hit){
            return hit._source.note;
        });

        res.send(results);
        console.log(results);
    }, function (err) {
        console.trace(err);
        res.send({response: err.message});
    });
});

app.post('/searchBynote', function(req, res) {
  var noteDetails=[];
  console.log("Name is: " + req.body.search);
  var result = {
    status: true,
    message: "Successfully added"
  };
  //setting the header
  res.setHeader('Content-Type', 'application/json');
  const search = function search(index, body) {
    return esClient.search({
      index: index,
      body: body
    });
  };
  // all calls should be initiated through the module
  const elasticSearch = function elasticSearch() {
    let body = {
      size: 20,
      from: 0,
      query: {
        multi_match: {
          query: req.body.search,
          fields: ['note'],
          //minimum_should_match: 3,
          //fuzziness: 2
        }
      }
    };
    //printing the matched values
    console.log(`retrieving documents whose city  match '${body.query.multi_match.query}' `);
    search('library', body)
      .then(results => {
        //console.log(`found ${results.hits.total} items in ${results.took}ms`);
        if (results.hits.total > 0) console.log(`notes:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.note} `));
        results.hits.hits.forEach((hit, index) => noteDetails.push("note is: "+hit._source.note));
        res.json({"details": noteDetails, "status": "true"});
      })
      .catch(console.error);
  };
  //calling the elasticSearch function
  elasticSearch();
  //exporting the module
  module.exports = {
    search
  };
});
module.exports = router;
