var startTime,endTime;
function start()
{
  startTime=new Date();
}
function stop()
{
  endTime=new Date();
  var elapsedTime=endTime-startTime;
  var seconds=elapsedTime/1000;
  document.write(seconds);
}
