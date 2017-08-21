var express =require("express");
var bodyParser=require("body-parser");
var path = require("path");
var app=express();
var fs=require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",express.static('./sample'));

app.post('/saving',function(req, res)
{

var d=JSON.stringify([req.body]);
console.log(JSON.stringify([req.body],0,4));
//console.log('you posted: First Name: ' + req.body.firstName);
// res.setHeader('Content-Type', 'application/json');
// res.send({firstName: req.body.firstName || null});
fs.writeFile( "filename.json", d, "utf8", function (err) {
  try {
    console.log(err);
    if (err) {
      throw err;
    }
    res.send({firstName: req.body.firstName || null});
    //console.log(data);
    //res.send({data:data,status:true,"message":"get success"});
  } catch (e) {
    console.error(e);
    res.send({err: "error writing file: "+e});
  }
});
// res.setHeader('Content-Type', 'application/json');

});


// app.get('/getJSON',function(req, res)
// {
// // Feth file data coding
//
// });
app.listen(3001,function()
{
  console.log("server running ");
})
