var obj = function () {}

obj.prototype.doSomething = function (arg1, arg2_) {
  var arg2 = typeof arg2_ === 'string' ? arg2_ : null

  var callback_ = arguments[arguments.length - 1]
  var callback = typeof callback_ === 'function' ? callback_ : null

  if (!arg2) {
    return callback(new Error('second arguments missing or not a string'))
  }

  callback(arg1)
}

let test = new obj()

try {
  test.doSomething('test', 3.55, function (value) {
    if (typeof value !== 'string') throw value
    console.log('value : ', value)
  })
} catch (err) {
  console.error(err)
}
