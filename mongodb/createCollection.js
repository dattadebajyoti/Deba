var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  db.createCollection("orders", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  db.createCollection("products", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  db.createCollection("logInDetails", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
