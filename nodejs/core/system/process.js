console.log(process.execPath)
console.log(process.version)
console.log(process.platform)
console.log(process.memoryUsage())

console.log('hello')

const asyncFunction = function (data, callback) {
  process.nextTick(function () {
    setTimeout(function () {
      callback(data)
    }, 0)
  })
}
asyncFunction('123', function (data) {
  let count = 0
  for (let i = 0; i < 1000000000; i++) {
    count += 1
  }
  console.log('data : ', data)
})

console.log('world')
// process.stdin.resume()
// process.stdin.on('data', function (chunk) {
//   process.stdout.write('data : ' + chunk)
// })
