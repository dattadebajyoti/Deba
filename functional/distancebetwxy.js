function readArray()
{
  //read the x and y cooridinates into the variables x and y
  var x=document.getElementById("i1").value;
  var y=document.getElementById("i2").value;
  //calculate the euclidean distance
  var distance=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
  document.write(distance);
}
