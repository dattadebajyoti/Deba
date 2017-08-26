var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = [
    { name: 'Deba', address: 'Highway 71'},
    { name: 'Rupam', address: 'Lowstreet 4'},
    { name: 'Mithu', address: 'Apple st 652'},
    { name: 'Pradip', address: 'Mountain 21'},
    { name: 'Mou', address: 'Valley 345'},
    { name: 'Rubi', address: 'Ocean blvd 2'},
    { name: 'Puja', address: 'Green Grass 1'},
    { name: 'Debi', address: 'Sky st 331'},
    { name: 'Pooja', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  db.collection("customers").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
