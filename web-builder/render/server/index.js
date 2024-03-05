const fs = require('fs')
const path = require('path')

dirPath = path.join(__dirname, '../')

function serverMain() {
  const clientMain = fs.readFileSync(dirPath + 'client/index.js', { encoding: 'utf-8' })
  console.log('hello : ', clientMain)
}

module.exports = {
  serverMain,
}
