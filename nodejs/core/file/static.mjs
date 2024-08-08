import fs from 'fs'
import http from 'http'
import mime from 'mime'

const base = './public'

http
  .createServer(function (req, res) {
    const pathname = base + req.url
    const type = mime.getType(pathname)

    fs.stat(pathname, function (err, stat) {
      if (err === null && stat.isFile()) {
        res.setHeader('Content-Type', type)
        res.statusCode = 200

        const file = fs.createReadStream(pathname)
        file.on('open', function () {
          file.pipe(res)
        })
        file.on('error', function (err) {
          console.log(err)
        })
      } else if (err.code === 'ENOENT') {
        res.writeHead(404)
        res.write('Bad request 404\n')
        res.end('Bad request 404\n')
      } else {
        res.writeHead(500)
        res.write('Server error\n')
        res.end()
      }
    })
  })
  .listen(8124)

console.log('Server is running at 8124')
