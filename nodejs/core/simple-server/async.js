const http = require('http')
const fs = require('fs')

var counter = 0
function writeNumbers(res) {
  for (let i = 0; i < 100; i++) {
    counter += 1
    res.write(counter.toString() + '\n')
  }
}

http
  .createServer(function (req, res) {
    const query = require('url').parse(req.url).query
    const app = require('querystring').parse(query).file + '.txt'

    res.writeHead(200, { 'content-type': 'text/plain' })
    writeNumbers(res)

    setTimeout(function () {
      console.log('opening ' + app)
      fs.readFile(app, 'utf-8', function (err, data) {
        if (err) {
          res.write('Could not find or open file for reading\n')
        } else {
          res.write(data)
        }
        res.end()
      })
    }, 2000)
  })
  .listen(8124)

console.log('Server running on port 8124')
