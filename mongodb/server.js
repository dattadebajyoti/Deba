var express=require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views
app.use(bodyParser.urlencoded({ extended: false }));

//mongodb setup in node
var mongo = require('mongodb');
db = new mongo.Db('mydb', new mongo.Server("127.0.0.1", 27017, {}), {});

//opening view

app.get('/', function(req,res){
    res.render('index');
})

//submit post data

app.post('/inserting', function (req, res) {

db.open(function(err, db) {
    db.collection('logInDetails', function(err, collection) {
        myObj = {
              "name" : req.body.name,
              "pwd" : req.body.pwd
        };
        collection.insert(myObj, function() {
            res.send('Inserted Successfully!');
            db.close();
        });
    });
});

});

//show data

// app.get('/show', function (req, res) {
// db.open(function(err, db) {
//
//  var getStudents = function(db, callback) {
//    var cursor =db.collection('logInDetails').find();
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          res.send(cursor);
//       } else {
//          callback();
//       }
//    });
// };
//
// });
// });

//start server

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
