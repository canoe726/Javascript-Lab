var count = 0
var timer = setInterval(function () {
  console.log(count)
  if (++count > 4) {
    clearInterval(timer)
  }
}, 300)

var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index)
  return currentValue + 5
})
console.log(newArr)
