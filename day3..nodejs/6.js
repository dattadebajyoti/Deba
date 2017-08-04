var buff= new Buffer(20)
for(var i=0;i<20;i++)
{
  buff[i]=i+97;
}
console.log(buff.toString('ASCII'));
var json=buff.toJSON(buff);
console.log(json);
