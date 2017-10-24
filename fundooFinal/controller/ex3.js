/**requiring express module*/
var express = require("express");
/**requiring body-parser module*/
var bodyParser = require("body-parser");
/**requiring path module*/
var path = require("path");
var app = express();
/**requiring fs module**/
var fs = require('fs');

var http = require('http').Server(app);

var io = require('socket.io')(http);

var PORT = process.env.PORT || 3005;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/chatApp";
MongoClient.connect(url, function(err, db) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
var user;
var chatdb=[];
  /*making the folder static to update the changes over there*/
  app.use("/", express.static('./chatapp'));

  /*posting the details sent by the client side and update
  those details in the file for the future process*/

  app.post('/logging', function(req, res) {
    res.setHeader("Content-Type", "application/json");
    var result = {
      status: true,
      message: "Successfully added"
    };
    db.collection("Storage").find({
      Name: req.body.Name
    }).toArray(function(err, data) {
      if (!err)
        if (data.length != 0) {
          res.json({
            data: "false"
          });
        }
      else {
        db.collection("Storage").insertOne({
          Name: req.body.Name,
          Password: req.body.Password
        }, function(err, result) {
          if (err) throw err;
        });
        res.json({
          data: "true"
        });
      }
    });
  });

  app.post('/signingin', function(req, res) {
    res.setHeader("Content-Type", "application/json");
    var result = {
      status: true,
      message: "Successfully added"
    };
    //inserting one value
    db.collection("Storage").find({
      Name: req.body.Name
    }).toArray(function(err, data) {
      //console.log(data);
      if (!err)
        if (data.length != 0) {
          if (data[0].Password == req.body.Password) {
            var user = req.body.Name;
            res.json({
              data: "false",
              name: req.body.Name
            });
          } else {
            res.json({
              data: "falsepwd",
              name: req.body.Name
            });
          }
        }
      else {
        res.json({
          data: "true",
          name: req.body.Name
        });
      }
    });
  });
  app.get('/get', function(req, res)
  {
    db.collection("ChatHistory").find({}, {_id:false, message:true,user:true,time:true}).toArray(function(err,data)
    {
      if(err)throw err;
      res.send(data);
    });
  });
  io.on('connection', function(socket) {
    socket.on('setUsername', function(data) {
      socket.emit('name', {
      username: data
      });
    });
    socket.on('msg', function(data) {
      db.collection("ChatHistory").insertOne(data);
      io.sockets.emit('newmsg', data);
    })
  });
});
http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});
