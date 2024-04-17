const express = require('express')
const cluster = require('cluster')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParse = require('body-parser')
const { create } = require('express-handlebars')
const expressSession = require('express-session')
const RedisStore = require('connect-redis').default
const { createClient } = require('redis')
const { redis } = require('./.credentials.json')

const handlers = require('./lib/handlers/handlers')
// const { email } = require('./lib/handlers/email')
const { logging } = require('./lib/logging')
const credentials = require('./.credentials.json')

const redisClient = createClient({
  url: redis.url,
})
redisClient.connect().catch(console.error)

redisClient.on('connect', () => {
  console.info('Redis connected!')
})
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err)
})

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
app.enable('trust proxy')

logging(app)

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
    store: new RedisStore({
      client: redisClient,
      prefix: 'express-session:',
    }),
  }),
)
app.use((req, res, next) => {
  if (cluster.isWorker) {
    console.log(`Worker ${cluster.worker.id} received request`)
  }
  next()
})

app.use(weatherMiddleware)
app.use(flashMiddleware)

app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/greeting', handlers.greeting)
app.get('/section-test', handlers.sectionTest)
app.get('/newsletter', handlers.newsletter)
app.get(
  '/fifty-fifty',
  (req, res, next) => {
    if (Math.random() < 0.5) return next()
    return res.send('sometimes this')
  },
  (req, res) => {
    return res.send('and sometimes that')
  },
)
app.get('/set-currency', handlers.setCurrency)
app.get('/set-currency/:currency', handlers.setCurrencyMiddleware)
app.get('/api/vacations', handlers.api.vacations)
app.get('/fail', (req, res) => {
  throw new Error('Nope!')
})
app.get('/epic-fail', (req, res) => {
  process.nextTick(() => {
    throw new Error('Nope!')
  })
})
// app.get('/smtp', (req, res) => {
// email.sendEmail()
// })

app.post('/newsletter', handlers.newsletterSubmit)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)
app.post('/api/vacation-photo', handlers.api.vacationPhotoContest)

app.use(handlers.notFound)
app.use(handlers.serverError)

function startServer(port) {
  app.listen(PORT, () => {
    console.log(`Start server on ${app.get('env')} mode at http://localhost:${PORT}`)
  })
}

if (require.main === module) {
  startServer(PORT)
} else {
  module.exports = startServer
}
