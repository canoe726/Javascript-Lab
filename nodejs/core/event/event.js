const events = require('events')

var em = new events.EventEmitter()
var counter = 0

setInterval(function () {
  em.emit('timed', counter++)
}, 3000)

em.on('timed', function (data) {
  console.log('timed: ', data)
})
