var express =require("express");
var bodyParser=require("body-parser");
var path = require("path");
var app=express();
var fs=require('fs');
var PORT = process.env.PORT || 3001;
var json;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",express.static('./sample'));

app.post('/saving',function(req, res)
{
  var result = {status:true,message:"Successfully added"};

res.setHeader('Content-Type', 'application/json');

fs.readFile("filename.json","utf8",function (err,data) {
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
  fs.writeFile("filename.json",JSON.stringify(data),"utf8",function (err,data) {
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








app.post('/deleting',function(req, res)
{
  console.log(req.body);
  var result = {status:true,message:"Successfully added"};

res.setHeader('Content-Type', 'application/json');

fs.readFile("filename.json","utf8",function (err,data) {
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
  for(var i=0;i<data.length;i++)
  {
    if(req.body==data[i].phoneNumber)
    {
      console.log("hioi");
      delete data[i];
    }
  }
  //data.push(req.body);
  fs.writeFile("filename.json",JSON.stringify(data),"utf8",function (err,data) {
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





















app.get('/get',function (req,res)
{

  // res.send("hello");
  fs.readFile("filename.json","utf8",function (err,data) {
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


app.listen(PORT,function()
{
  console.log("server is listening to %s port",PORT);
})
