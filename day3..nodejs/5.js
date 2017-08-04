const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
eventEmitter.on('randomString', function (randomStr1,randomStr2,randomStr3) {
  console.log('string1: ' + randomStr1+'string2: '+randomStr2+' string3:'+randomStr3)
})

eventEmitter.on('randomString', function (randomStr1,randomStr2,randomStr3) {
  console.log('string1: ' + randomStr1+'string2: '+randomStr2+' string3:'+randomStr3)
})

eventEmitter.on('randomString', function (randomStr1,randomStr2,randomStr3) {
  console.log('string1: ' + randomStr1+'string2: '+randomStr2+' string3:'+randomStr3)
})


eventEmitter.emit('randomString', randomString(),randomString(),randomString())
function randomString () {
  const stringsArr = ['deba', 'rupam', 'raju', 'john']
  return stringsArr[Math.floor(Math.random() * stringsArr.length)]
}
