
//declare 2 variable to store the start time and the end time
var startTime,endTime;
function start()
{
  startTime=new Date();
}
function stop()
{
  endTime=new Date();
  //decalre a variable to store the elapsed time and convert it to seconds
  var elapsedTime=endTime-startTime;
  var seconds=elapsedTime/1000;
  document.write(seconds);
}
