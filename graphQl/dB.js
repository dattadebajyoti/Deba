var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("userInfo", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
 });
});
