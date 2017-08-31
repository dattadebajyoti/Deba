var express =require("express");
var bodyParser=require("body-parser");
var path = require("path");
var app=express();
var PORT = process.env.PORT || 3002;
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static('./sample'));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db)
{
  if (err) throw err;
  var json;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));


  app.post('/inserting',function(req, res)
  {
    var result = {status:true,message:"Successfully added"};
    res.setHeader('Content-Type', 'application/json');
    //console.log(req.body.name+" "+req.body.pwd);
     MongoClient.connect(url, function(err,db) {
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
  });





  app.post('/deleting',function(req, res)
  {
    console.log(req.body.name+" "+req.body.pwd);
    res.setHeader("Content-Type","application/json");
    var result = {status:true,message:"Successfully deleted"};
    var delObj={name : req.body.name, pwd : req.body.pwd};
      // db.collection("logInDetails").deleteOne(delObj,function(err,obj) {
      //   if (err) throw err;
      //   console.log("1 Entry deleted");
      //   db.close();
      // });
      db.collection("logInDetails").find({name:req.body.name,pwd:req.body.pwd}).toArray(function(err,result)
      {
        console.log(result);
        if(!err)
        if(result.length!=0)
        {
          console.log("abc");
          db.collection("logInDetails").deleteOne(delObj,function(err,result)
          {
            if(err)throw err;
            console.log("1 entry deleted");
            res.json({result:"true"});
          });
        }
        else {
          res.json({result:"false"});
        }
      });
  });


  app.post('/editing',function(req,res)
  {
    console.log(req.body);
    res.setHeader("Content-Type","application/json");
    var result={status:true,message:"Successfully Edited"};
    var myquery={name : req.body.name, pwd : req.body.Pwd};
    var editObj={name : req.body.nameUpdate, pwd : req.body.pwdUpdate};
  // MongoClient.connect(url,function(err,db) {
  //   if (err) throw err;
      db.collection("logInDetails").updateOne(myquery,editObj,function(err,result) {
        if (err) throw err;
        console.log("1 entry updated");
        db.close();
      });
  // });
  });


  app.post('/signingin', function(req, res)
  {
    res.setHeader("Content-Type","application/json");
    var result = {status: true,message: "Successfully added"};
  // MongoClient.connect(url,function(err,db) {
  //   if (err) throw err;
      db.collection("logInDetails").find({name:req.body.name,pwd:req.body.pwd}).toArray(function(err,data)
      {
        if(!err)
        if(data.length!=0)
        {
          console.log("hiii");
          res.json({data:"false"});
        }
        else
        {
          res.json({data:"true"});
        }
      });
  // });
  });
  //db.close();
});
app.listen(PORT,function()
{
  console.log("server is listening to %s port",PORT);
});
