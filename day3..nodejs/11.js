var express=require('express');
var app=new express();
app.get('/',function(req,res){
               res.send('helow world!');
});
var server=app.listen(8081,function(){})
