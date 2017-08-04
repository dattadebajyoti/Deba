function readArray()
{
  var i1=document.getElementById("i1").value;
  var i2=document.getElementById("i2").value;
  var distance=Math.sqrt(Math.pow(i1,2)+Math.pow(i2,2));
  document.write(distance);
}
