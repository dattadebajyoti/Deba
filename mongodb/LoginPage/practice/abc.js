var express = require("express");
/**requiring body-parser module*/
var bodyParser = require("body-parser");
/**requiring path module*/
var path = require("path");
var app = express();
/**requiring fs module*/
var fs = require('fs');
var PORT = process.env.PORT || 3002;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/database";
MongoClient.connect(url,function(err,db)
{
var json;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*making the folder static to update the changes over there*/
app.use("/", express.static('./sample'));

/*posting the details sent by the client side and update
those details in the file for the future process*/

app.post('/inserting', function(req, res)
{
  res.setHeader("Content-Type","application/json");
  var result = {
    status: true,
    message: "Successfully added"
};
  //inserting one value
db.collection("logInDetails").find({name:req.body.name}).toArray(function(err,data)
{
  if(!err)
  if(data.length!=0)
  {
    res.json({data:"false"});
  }
  else
  {
    db.collection("logInDetails").insertOne({name:req.body.name,pwd:req.body.pwd},function(err,result)
      {
          if(err)throw err;
      });
      res.json({data:"true"});
  }
});
});
app.post('/signingin', function(req, res)
{
  res.setHeader("Content-Type","application/json");
  var result = {
    status: true,
    message: "Successfully added"
  };
  //inserting one value
  db.collection("logInDetails").find({Name:req.body.name}).toArray(function(err,data)
  {
    if(!err)
    if(data.length!=0)
    {
      res.json({data:"false"});
    }
    else
    {
      res.json({data:"true"});
    }
  });
});
app.post('/deleting', function(req, res)
{
  res.setHeader("Content-Type","application/json");
  var result = {
    status: true,
    message: "Successfully added"
};
  //deleting one value
var obj={Name:req.body.Name,Password:req.body.pwd};
db.collection("logInDetails").find({pwd:req.body.pwd}).toArray(function(err,data)
{
  if(!err)
  if(data.length!=0)
  {
    db.collection("logInDetails").deleteOne(delObj,function(err,data)
    {
      if(err)throw err;
      console.log("1 entry deleted");
      res.json({data:"true"});
    });
  }
  else {
    res.json({data:"false"});
  }
});
});

app.post('/updating', function(req, res)
{
  res.setHeader("Content-Type","application/json");
  var result = {
    status: true,
    message: "Successfully added"
};
  //deleting one value
var name={Name:req.body.Name};
var change_pwd={Name:req.body.Name,Password:req.body.Password};
db.collection("Intellect").find({Name:req.body.Name}).toArray(function(err,data)
{
  if(!err)
  if(data.length!=0)
  {
    db.collection("Intellect").updateOne(name,change_pwd,function(err,data)
    {
      if(err)throw err;
      res.json({data:"true"});
    });
  }
  else {
      res.json({data:"false"});
  }
});
});
app.get('/get', function(req, res)
{
db.collection("Intellect").find({},{_id:false, Name:true, Password:true}).toArray(function (err, data)
    {
  if(err)throw err;
  res.send(data);
    });
  db.close();
});
});
app.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
})
