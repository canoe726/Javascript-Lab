const util = require('util')

class Bar {}

console.log(util.inspect(new Bar()))

function first() {
  let self = this
  this.name = 'first'
  this.test = function () {
    console.log(self.name)
  }
}
first.prototype.output = function () {
  console.log(this.name)
}

function second() {
  second.super_.call(this)
  this.name = 'second'
}
util.inherits(second, first)

let two = new second()
function third(func) {
  this.name = 'third'
  this.callMethod = func
}

let three = new third(two.test)
two.output()
two.test()
three.callMethod()
