var fs=require("fs");
console.log("going to write into the file");
fs.writeFile('input.txt',"hiiiii iam now able to write",function(err,data){
                                      if(err){
                                      console.log(err.stack);
                                      }
console.log("writing over");
console.log("going to read");
fs.readFile('input.txt',function(err,data){
                                      if(err){
                                      console.log(err.stack);
                                      }
            console.log("data is: "+data.toString());
});
});
