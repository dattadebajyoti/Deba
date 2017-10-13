var schedule = require('node-schedule');
var date = new Date(2017, 10, 10, 14, 44, 0);
 
var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});
