const fs = require('fs')
const Step = require('step')

let files
let _dir = './__data__/'

try {
  Step(
    function readFiles() {
      fs.readFile(_dir + 'data1.txt', 'utf-8', this.parallel())
    },
    function writeFiles(err, data1) {
      if (err) throw err
      data1 = data1.replace(/data/g, 'hello world')

      fs.writeFile(_dir + 'data1.txt', data1, 'utf-8', this.parallel())
    },
  )
} catch (err) {
  console.error(err)
}
