const util = require('util')
const eventEmitter = require('events').EventEmitter
const fs = require('fs')

function inputChecker(name, file) {
  this.name = name
  this.writeStream = fs.createWriteStream(`./${file}.txt`, {
    flags: 'a',
    encoding: 'utf-8',
    mode: '0666',
  })
}

util.inherits(inputChecker, eventEmitter)

inputChecker.prototype.check = function check(input) {
  var command = input.toString().trim().substr(0, 3)
  if (command == 'wr:') {
    this.emit('write', input.substr(3, input.length))
  } else if (command == 'en:') {
    this.emit('end')
  } else {
    this.emit('echo', input)
  }
}

var ic = new inputChecker('Shelly', 'output')

ic.on('write', function (data) {
  this.writeStream.write(data, 'utf-8')
})
ic.on('echo', function (data) {
  console.log(this.name + ' wrote ' + data)
})
ic.on('end', function () {
  process.exit()
})

process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdin.on('data', function (input) {
  ic.check(input)
})
