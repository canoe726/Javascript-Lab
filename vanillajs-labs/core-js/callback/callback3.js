var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this
    return function () {
      console.log(self.name)
    }
  },
  func1: function () {
    console.log(obj1.name)
  },
}
var callback = obj1.func()

// setTimeout(callback, 200)
// setTimeout(obj1.func1, 200)

var obj2 = {
  name: 'obj2',
}
var callback = obj1.func.call(obj2)
setTimeout(callback, 200)
setTimeout(obj1.func.bind(obj2)(), 200)
