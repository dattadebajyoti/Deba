//requiring the express module
var express = require("express");
//requiring bodyparser to pass values through http
var bodyParser = require("body-parser");
//requiring the path
var path = require("path");
//creating the exress object
var app = express();
//requiring the fs module
var fs = require('fs');
var PORT = process.env.PORT || 3001;
var json;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//requiring the elasticSearch module
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});
//making the folder static to save changes
app.use("/", express.static('./sample'));

var city=[];
//saving details using post
app.post('/saving', function(req, res) {
  //console.log(req);
  var result = {
    status: true,
    message: "Successfully added"
  };

  res.setHeader('Content-Type', 'application/json');

  fs.readFile("filename.json", "utf8", function(err, data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
      data = [];
    }
    if (!(data instanceof Array)) {
      data = [];
    }
    data.push(req.body);
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      try {
        if (err) {
          throw err;
        }
        res.send(result);

      } catch (e) {
        result.status = false;
        result.message = "failed set";
        res.send(result);
      }
    });
  });
});







//post method for deleting
app.post('/deleting', function(req, res) {
  console.log(req.body);
  var result = {
    status: true,
    message: "Successfully added"
  };

  res.setHeader('Content-Type', 'application/json');

  fs.readFile("filename.json", "utf8", function(err, data) {
    console.log(data);
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
      data = [];
    }
    if (!(data instanceof Array)) {
      data = [];
    }
    for (var i = 0; i < data.length; i++) {
      if (req.body.phoneNumber == data[i].phoneNumber) {
        console.log("hioi");
        delete data[i];
      }
    }
    //data.push(req.body);
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      try {
        if (err) {
          throw err;
        }
        res.send(result);

      } catch (e) {
        result.status = false;
        result.message = "failed set";
        res.send(result);
      }
    });
  });
});


//post function to edit

app.post('/editing', function(req, res) {
  console.log(req.body);
  var result = {
    status: true,
    message: "Successfully added"
  };

  res.setHeader('Content-Type', 'application/json');

  fs.readFile("filename.json", "utf8", function(err, data) {
    console.log(data);
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
      data = [];
    }

    //data.push(req.body);
    for (var i = 0; i < data.length; i++) {
      if (data[i] != null)
      //document.write(data[i]);
      {
        if (req.body.firstName == data[i].firstName) {
          data[i].firstName = req.body.firstName;
          data[i].lastName = req.body.lastName;
          data[i].address = req.body.address;
          data[i].city = req.body.city;
          data[i].state = req.body.state;
          data[i].zip = req.body.zip;
          data[i].phoneNumber = req.body.phoneNumber;
        }
      }
    }
    if (!(data instanceof Array)) {
      data = [];
    }
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      try {
        if (err) {
          throw err;
        }
        res.send(result);

      } catch (e) {
        result.status = false;
        result.message = "failed set";
        res.send(result);
      }
    });
  });
});


//api to elasticSearch
app.post('/elasticSearch', function(req, res) {
  console.log("city is: " + req.body.search);
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
          fields: ['city'],
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
        if (results.hits.total > 0) console.log(`returned city names:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.city} `));
        results.hits.hits.forEach((hit, index) => city.push("First name is: "+hit._source.firstName+", Last name: "+hit._source.lastName+", Address: "+hit._source.address+", City: "+hit._source.city+", State "+hit._source.state+", Zip: "+hit._source.zip+", Phone Number: "+hit._source.phoneNumber));
        res.json({"details": city, "status": "true"});
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

//autocomplete
app.get('/autocomplete', function (req, res) {
    console.log("deba");
    esClient.search({
        index: "library",
        type: "article",
        body: {
            "query": {

                  match: {
                    firstName: req.query.term
                  }
            }
        }
    }).then(function (resp) {

      // "filtered": {
      //   "query": {
      //       "multi_match": {
      //           "query": req.query.term,
      //           "fields": ["first_name.autocomplete"]
      //       }
      //   }
      // }
        var results = resp.hits.hits.map(function(hit){
            return hit._source.firstName + " " + hit._source.lastName;
        });

        res.send(results);
        console.log(results);
    }, function (err) {
        console.trace(err);
        res.send({response: err.message});
    });
});

//api to elasticSearchByname
app.post('/elasticSearchByName', function(req, res) {
  var nameDetails=[];
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
          fields: ['firstName'],
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
        if (results.hits.total > 0) console.log(`returned city names:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.city} `));
        results.hits.hits.forEach((hit, index) => nameDetails.push("First name is: "+hit._source.firstName+", Last name: "+hit._source.lastName+", Address: "+hit._source.address+", City: "+hit._source.city+", State "+hit._source.state+", Zip: "+hit._source.zip+", Phone Number: "+hit._source.phoneNumber));
        res.json({"details": nameDetails, "status": "true"});
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


//get function to read
app.get('/get', function(req, res) {

  // res.send("hello");
  fs.readFile("filename.json", "utf8", function(err, data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
      data = [];
    }
    if (!(data instanceof Array)) {
      data = [];
    }
    res.send(data);
  });
});

//listening to the port
app.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
})
