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
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

function elasticSearch() {

}

/**
 * @method init() => Init this object
 **/
elasticSearch.prototype.init = function() {}


/***
 * @Method searchByNote
 * @description to search by note using elastic search
 ***/

elasticSearch.prototype.searchByNote = function(req, res, next) {
  var noteDetails = [];
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
          fields: ['note']
        }
      }
    };
    //printing the matched values
    console.log(`retrieving documents whose note  match '${body.query.multi_match.query}' `);
    search('notedata', body)
      .then(results => {
        // console.log(results);
        if (results.hits.total > 0) console.log(`returned notes:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.note} `));
        results.hits.hits.forEach((hit, index) => noteDetails.push({
          note: hit._source.note,
          cardId: hit._source.cardId,
          userId: hit._source.userId,
          timeOfCreation: hit._source.timeOfCreation,
          remainder: hit._source.remainder,
          color: hit._source.color,
          trash: hit._source.trash,
          pin: hit._source.pin,
          pinColor: hit._source.pinColor,
          isArchive: hit._source.isArchive,
          title: hit._source.title
        }));
        console.log(noteDetails);
        res.json({
          "details": noteDetails,
          "status": "true"
        });
      })
      .catch(console.error);
  };
  //calling the elasticSearch function
  elasticSearch();
  //exporting the module
  module.exports = {
    search
  };
};



/***
 * @Method autocomplete
 * @description to search using autocomplete
 ***/
elasticSearch.prototype.autocomplete = function(req, res, next) {
  console.log("in autocomplete");
  esClient.search({
    index: "notedata",
    type: "note",
    body: {
      "query": {

        match: {
          note: req.query.term
        }
      }
    }
  }).then(function(resp) {
    var results = resp.hits.hits.map(function(hit) {
      return hit._source.note;
    });

    res.send(results);
    console.log(results);
  }, function(err) {
    console.trace(err);
    res.send({
      response: err.message
    });
  });
};


//exporting the controller to be used in the routes
module.exports = {
  elasticSearch: elasticSearch
};
