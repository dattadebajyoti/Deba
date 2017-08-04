var fs=require('fs');
  var data1='learning nodejs technology';
  var writes=fs.createWriteStream('input.txt');
  writes.write(data1,'ASCII');
  writes.end;
  writes.on('finish',function(){
                      console.log("writing completed");
                    });
  writes.on('err',function(err){
                    console.log('err.stack');
                    });
  console.log("writing ended");


  var fs=require("fs");
  var data='';
  var reads=fs.createReadStream('input.txt');
  reads.setEncoding('ASCII');
  reads.on('data',function(chunk){
              data=data+chunk;
            });
  reads.on('end',function(){
                   console.log(data);
                 });
  reads.on('err',function(err){
                  console.log(err.stack);
                });
    console.log("reading ended");
