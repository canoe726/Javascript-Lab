const fs = require('fs')
const async = require('async')

try {
  async.parallel(
    {
      data1: function (callback) {
        fs.readFile('../__data__/data1.txt', 'utf-8', function (err, data) {
          callback(err, data)
        })
      },
      log: function (callback) {
        fs.readFile('../__data__/log.txt', 'utf-8', function (err, data) {
          callback(err, data)
        })
      },
    },
    function (err, result) {
      if (err) throw err
      console.log(result)
    },
  )
} catch (err) {
  console.log(err)
}
