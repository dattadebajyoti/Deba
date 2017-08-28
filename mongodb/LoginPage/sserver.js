var express =require("express");
var bodyParser=require("body-parser");
var path = require("path");
var app=express();
var PORT = process.env.PORT || 3002;
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static('./sample'));

var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db)
{
var json;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
});

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.createCollection("logInDetails", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//  });
// });
app.post('/inserting',function(req, res)
{
  var result = {status:true,message:"Successfully added"};
  res.setHeader('Content-Type', 'application/json');
  //console.log(req.body.name+" "+req.body.pwd);
  // MongoClient.connect(url, function(err,db) {
  //   if (err) throw err;
    var myObj=[
      { name : req.body.name, pwd : req.body.pwd}
    ];
    db.collection("logInDetails").insertMany(myObj, function(err, res) {
      if (err) throw err;
      console.log("Account Created");
      //console.log("Account details: "+res.result);
      db.close();
    })
    db.collection("logInDetails").find({}, { _id: false }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
 });
// });





app.post('/deleting',function(req, res)
{
  console.log(req.body);
  var result = {status:true,message:"Successfully added"};
  var delObj={name : req.body.name, pwd : req.body.pwd};
  MongoClient.connect(url,function(err,db) {
    if (err) throw err;
    db.collection("logInDetails").deleteMany(delObj,function(err,obj) {
      if (err) throw err;
      console.log("1 Entry deleted");
      db.close();
    });
  });
});


app.post('/editing',function(req,res)
{
  console.log(req.body);
  var result={status:true,message:"Successfully Edited"};
  var myquery={name : req.body.name, pwd : req.body.Pwd};
  var editObj={name : req.body.nameUpdate, pwd : req.body.pwdUpdate};
  MongoClient.connect(url,function(err,db) {
    if (err) throw err;
    db.collection("logInDetails").updateOne(myquery,editObj,function(err,result) {
      if (err) throw err;
      console.log("1 entry updated");
      db.close();
    });
  });
});



app.listen(PORT,function()
{
  console.log("server is listening to %s port",PORT);
});
