const connect = require('connect')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const path = require('path')
const http = require('http')
const fs = require('fs')
const custom = require('./custom')

const writeLogStream = fs.createWriteStream('./middleware/log.txt', {
  flags: 'a',
  encoding: 'utf-8',
  mode: 0o666,
})

const clearSession = (req, res, next) => {
  if ('/clear' === req.url) {
    req.session = null
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  } else {
    next()
  }
}

const trackUser = (req, res, next) => {
  req.session.ct = req.session.ct || 0
  req.session.username = req.session.username || req.cookies.username
  console.log(req.cookies.username + ' requested ' + req.session.ct++ + ' resources this session')

  next()
}

const app = connect()
  .use(morgan('dev', { stream: writeLogStream }))
  .use(custom('public', '404 File Not Found', '403 Directory Access Forbidden'))
  .use(cookieParser())
  .use(
    cookieSession({
      name: 'session',
      keys: ['cookie-session'],
      maxAge: 60 * 1000,
    }),
  )
  .use(clearSession)
  .use(trackUser)
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
