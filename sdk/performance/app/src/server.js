const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000
const HOSTNAME = '127.0.0.1'
const MIME_TYPES = {
  '.js': 'application/javascript',
}

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const getLocalFile = (filePath) => {
  let retry = 3

  return async function readLocalFile() {
    return new Promise((res, rej) => {
      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (retry > 0) {
            retry -= 1

            readLocalFile()
              .then((value) => {
                res(value)
              })
              .catch(() => {
                rej({
                  code: error.code,
                  message: 'Failed to load with retry',
                })
              })
          } else {
            if (error.code === 'ENOENT') {
              rej({
                code: error.code,
                message: 'Failed to read',
              })
            } else {
              rej({
                code: error.code,
                message: 'Unknown server is occurred',
              })
            }
          }
        } else {
          res(content)
        }
      })
    })
  }
}

const serveStaticFile = async (req, res) => {
  const REQ_PREFIX = '/sdk'
  const filePath = path.join(__dirname, req.url.slice(REQ_PREFIX.length))
  const extname = path.extname(filePath)
  const contentType = MIME_TYPES[extname]

  if (extname.length === 0 || extname !== '.js') {
    res.writeHead(500)
    res.end('Can not find any javascript sdk')
    return
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  try {
    const file = await getLocalFile(filePath)()

    if (file instanceof Buffer) {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(file)
    } else {
      throw new Error('Failed to load file')
    }
  } catch (error) {
    res.writeHead(500)
    res.end(error.message)
  }
}

const router = (req, res) => {
  if (req.url.startsWith('/sdk')) {
    try {
      serveStaticFile(req, res)
      return
    } catch (error) {
      res.end('Failed to serve static file')
    }
  }

  res.writeHead(200)
  res.end('SDK test')
}

const server = http.createServer((req, res) => {
  setCors(res)
  router(req, res)
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})
