Array.prototype.map = function (callback, thisArg) {
  var mappedArr = []
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg, this[i], i, this)
    mappedArr[i] = mappedValue
  }
  return mappedArr
}

console.log(
  [10, 20, 30].map(function (value, index) {
    return value + index
  }),
)
