const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParse = require('body-parser')
const { create } = require('express-handlebars')
const expressSession = require('express-session')

const handlers = require('./lib/handlers/handlers')
const { email } = require('./lib/handlers/email')
const credentials = require('./.credentials.json')

const weatherMiddleware = require('./middlewares/weather')
const flashMiddleware = require('./middlewares/flash')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = create({
  defaultLayout: 'main',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')
app.disable('x-powered-by')

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())
app.use(cookieParser(credentials.cookieSecret))
app.use(
  expressSession({
    name: 'express-sid',
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  }),
)

app.use(weatherMiddleware)
app.use(flashMiddleware)

app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/greeting', handlers.greeting)
app.get('/section-test', handlers.sectionTest)
app.get('/newsletter', handlers.newsletter)
app.post('/newsletter', handlers.newsletterSubmit)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)
// app.get('/smtp', (req, res) => {
// email.sendEmail()
// })

app.use(handlers.notFound)
app.use(handlers.serverError)

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Start server on http://localhost:${PORT}`)
  })
} else {
  module.exports = app
}
