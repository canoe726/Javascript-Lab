// example 1
var outer = function () {
  var a = 1
  var innerFunc = function () {
    return ++a
  }
  return innerFunc
}

var outer2 = outer()
console.log(outer2())
console.log(outer2())
// example 2
;(function () {
  var a = 0
  var intervalId = null
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId)
    }
    console.log(a)
  }
  intervalId = setInterval(inner, 1000)
})()
