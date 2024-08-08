const fs = require('fs')
const async = require('async')
const _dir = '../__data__/'

let writeStream = fs.createWriteStream(_dir + './log.txt', {
  flags: 'a',
  encoding: 'utf-8',
  mode: '0666',
})

try {
  async.waterfall(
    [
      function readDir(callback) {
        fs.readdir(_dir, function (err, files) {
          callback(err, files)
        })
      },
      function loopFiles(files, callback) {
        files.forEach(function (name) {
          callback(null, name)
        })
      },
      function checkFile(file, callback) {
        fs.stat(_dir + file, function (err, stats) {
          callback(err, stats, file)
        })
      },
      function readData(stats, file, callback) {
        if (stats.isFile()) {
          fs.readFile(_dir + file, 'utf-8', function (err, data) {
            callback(err, file, data)
          })
        }
      },
      function modify(file, text, callback) {
        let adjData = text.replace(/data/g, 'hello world')
        callback(null, file, adjData)
      },
      function writeData(file, text, callback) {
        fs.writeFile(_dir + file, text, function (err) {
          callback(err, file)
        })
      },
      function logChange(file, callback) {
        writeStream.write('changed ' + file + '\n', 'utf-8', function (err) {
          callback(err, file)
        })
      },
    ],
    function (err, result) {
      if (err) throw err
      console.log('modified: ', result)
    },
  )
} catch (err) {
  console.log(err)
}
