const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

exports.logging = function (app) {
  switch (app.get('env')) {
    case 'development':
      app.use(morgan('dev'))
      break
    case 'production':
      const stream = fs.createWriteStream(path.join(__dirname, '/access.log'), { flags: 'a' })
      app.use(morgan('combined', { stream }))
      break
  }
}
