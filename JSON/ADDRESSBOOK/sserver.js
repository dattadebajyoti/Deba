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
//making the folder static to save changes
app.use("/", express.static('./sample'));

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
