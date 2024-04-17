const express = require('express')
const cluster = require('cluster')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParse = require('body-parser')
const { create } = require('express-handlebars')
const expressSession = require('express-session')
const credentials = require('./.credentials.json')

const handlers = require('./routes/handlers')
const { logging } = require('./lib/logging')
const weatherMiddleware = require('./middlewares/weather')
const flashMiddleware = require('./middlewares/flash')
const { RedisDatabase } = require('./database/redis/redis')

class ExpressServer {
  app = null
  port = process.env.PORT || 3000
  redisDatabase = null

  constructor() {
    this.app = express()
    this.redisDatabase = new RedisDatabase()
  }

  #initTemplateEngine() {
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

    this.app.engine('handlebars', hbs.engine)
    this.app.set('view engine', 'handlebars')
    this.app.set('views', './views')
  }

  #initLogging() {
    logging(this.app)
  }

  #initExpressConfig() {
    this.app.use(express.static(path.join(__dirname, '/public')))

    this.app.disable('x-powered-by')
    this.app.enable('trust proxy')
  }

  #initCookieConfig() {
    this.app.use(cookieParser(credentials.cookieSecret))
  }

  #initSessionConfig() {
    this.app.use(
      expressSession({
        name: 'express-sid',
        resave: false,
        saveUninitialized: false,
        secret: credentials.cookieSecret,
        store: this.redisDatabase.getRedisStore(),
      }),
    )
  }

  #initClusterConfig() {
    this.app.use((req, res, next) => {
      if (cluster.isWorker) {
        console.log(`Worker ${cluster.worker.id} received request`)
      }
      next()
    })
  }

  #initIntegrateThirdParty() {
    this.app.use(bodyParse.urlencoded({ extended: true }))
    this.app.use(bodyParse.json())
  }

  #startWorker() {
    const worker = cluster.fork()
    console.log(`CLUSTER: Worker ${worker.id} started`)
  }

  initialize() {
    this.#initTemplateEngine()
    this.#initLogging()
    this.#initExpressConfig()
    this.#initCookieConfig()
    this.#initSessionConfig()
    this.#initClusterConfig()
    this.#initIntegrateThirdParty()
  }

  useMiddlewares() {
    this.app.use(weatherMiddleware)
    this.app.use(flashMiddleware)
  }

  startServer(port) {
    const PORT = port ?? this.port

    this.app.listen(PORT, () => {
      console.log(`Start server on ${this.app.get('env')} mode at http://localhost:${PORT}`)
    })
  }

  start(port, mode = 'single' | 'cluster') {
    if (mode === 'single') {
      this.startServer(port)
    } else {
      if (cluster.isMaster) {
        require('os').cpus().forEach(this.#startWorker)

        cluster.on('disconnect', (worker) =>
          console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`),
        )

        cluster.on('exit', (worker, code, signal) => {
          console.log(`CLUSTER: Worker ${worker.id} died with exit ` + `code ${code} (${signal})`)
          this.startWorker()
        })
      } else {
        this.startServer(this.port)
      }
    }
  }

  addRoutes() {
    handlers.getRoutes(this.app)
    handlers.postRoutes(this.app)
    handlers.exceptionRoutes(this.app)
  }
}

function main() {
  const expressServer = new ExpressServer()

  expressServer.initialize()
  expressServer.useMiddlewares()
  expressServer.addRoutes()
  expressServer.start(3000, 'single')
}

main()
