// example 1
var outer = (function () {
  var a = 1
  var inner = function () {
    return ++a
  }
  return inner
})()

console.log(outer())
console.log(outer())
outer = null(
  // example 2
  function () {
    var a = 0
    var intervalId = null
    var inter = function () {
      if (++a >= 10) {
        clearInterval(intervalId)
        inter = null
      }
      console.log(a)
    }
    setInterval(inter, 1000)
  },
)()
