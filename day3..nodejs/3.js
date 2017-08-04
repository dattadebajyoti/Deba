var events=require('events');
var eventEmitter= new events.EventEmitter();
var connectHandler = function connected()
		     {
                       console.log('connection successful');
     		       eventEmitter.emit('data recieved');
                      }
eventEmitter.on('connecton',connectHandler);
eventEmitter.on('data_recieved',function(){
                                console.log('data recieved');
                                }
		);
eventEmitter.emit('connected');
console.log('data recieved successfully');
eventEmitter.emit('connected');
console.log('program ended');
