const fs = require('fs')
const Step = require('step')

let files
let _dir = './__data__/'

try {
  Step(
    function readDir() {
      fs.readdir(_dir, this)
    },
    function readFile(err, results) {
      if (err) throw err
      files = results
      let group = this.group()
      results.forEach(function (name) {
        fs.readFile(_dir + name, 'utf-8', group())
      })
    },
    function writeAll(err, data) {
      if (err) throw err
      for (let i = 0; i < files.length; i++) {
        let adjData = data[i].replace(/data/g, 'hello world')
        fs.writeFile(_dir + files[i], adjData, 'utf-8', this)
      }
    },
  )
} catch (err) {
  console.error(err)
}
