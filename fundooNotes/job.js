var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('26 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
