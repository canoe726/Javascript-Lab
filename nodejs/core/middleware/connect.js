const connect = require('connect')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const path = require('path')
const http = require('http')
const fs = require('fs')

const writeLogStream = fs.createWriteStream('./middleware/log.txt', {
  flags: 'a',
  encoding: 'utf-8',
  mode: 0o666,
})

const app = connect()
  .use(morgan('dev', { stream: writeLogStream }))
  .use(cookieParser())
  .use(
    cookieSession({
      name: 'session',
      keys: ['cookie-session'],
      maxAge: 60 * 1000,
    }),
  )
  .use(favicon(path.join(__dirname, '../', 'public', 'favicon.ico')))
  .use(
    serveStatic(path.join(__dirname, '../', 'public'), {
      maxAge: '1h',
    }),
  )
  .use(function (req, res, next) {
    console.log('tracking ' + JSON.stringify(req?.cookies))
    res.end('Hello World\n')
    next()
  })

http.createServer(app).listen(8124)
console.log('Server listening on port 8124')
