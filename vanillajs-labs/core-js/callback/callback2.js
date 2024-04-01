// setTimeout(function () {
//   console.log(this === global)
// }, 100)
// ;[1, 2, 3, 4, 5].forEach(function (x) {
//   console.log(this)
// })

var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i)
  },
}
obj.logValues(1, 2)
;[4, 5, 6].forEach(obj.logValues, {})
