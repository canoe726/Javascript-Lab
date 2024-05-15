const event = require('events')
const util = require('util')

let someObj = function () {}

util.inherits(someObj, event.EventEmitter)

someObj.prototype.saySomething = function (arg) {
  this.emit('event', arg)
}

someObj.prototype.on('event', function (data) {
  console.log('say: ', data)
})

const instance = new someObj()
instance.saySomething('hello world')
