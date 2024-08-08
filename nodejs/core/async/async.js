const fs = require('fs')
const async = require('async')

try {
  async.waterfall(
    [
      function readData(callback) {
        fs.readFile('../__data__/data1.txt', 'utf-8', function (err, data) {
          callback(err, data)
        })
      },
      function modify(text, callback) {
        let adjData = text.replace(/data/g, 'hello world')
        callback(null, adjData)
      },
      function writeData(text, callback) {
        fs.writeFile('../__data__/data1.txt', text, function (err) {
          callback(err, text)
        })
      },
    ],
    function (err, result) {
      if (err) throw err
      console.log(result)
    },
  )
} catch (err) {
  console.log(err)
}
