import bodyParse from 'body-parser'
import cluster from 'cluster'
import cors from 'cors'
import express, { Express } from 'express'
import http, { Server } from 'http'

import { ServerRouters } from 'core/core.type'
import { httpResponseInterceptor } from 'lib/handlers/interceptor'
import { logger } from 'lib/logger'

export class ExpressServer {
  server: Server
  hostname: string
  port: number
  app: Express
  routers: ServerRouters[] = []

  constructor(hostname: string, port: number) {
    this.app = express()
    this.server = http.createServer(this.app)
    this.hostname = hostname
    this.port = port
  }

  #initLogging() {
    logger(this.app)
  }

  #initExpressConfig() {
    this.app.disable('x-powered-by')
    this.app.enable('trust proxy')
    this.app.use(httpResponseInterceptor)
  }

  #initCookieConfig() {
    // this.app.use(cookieParser(credentials.cookieSecret));
  }

  #initSessionConfig() {
    // this.app.use(
    //   expressSession({
    //     name: "express-sid",
    //     resave: false,
    //     saveUninitialized: false,
    //     secret: credentials.cookieSecret,
    //   })
    // );
  }

  #initClusterConfig() {
    this.app.use((req, res, next) => {
      if (cluster && cluster.isWorker) {
        console.log(`Worker ${cluster.worker!.id} received request`)
      }
      next()
    })
  }

  #initIntegrateThirdParty() {
    this.app.use(cors())
    this.app.use(bodyParse.urlencoded({ extended: true }))
    this.app.use(bodyParse.json())
  }

  #startWorker() {
    const worker = cluster.fork()
    console.log(`CLUSTER: Worker ${worker.id} started`)
  }

  initialize() {
    this.#initLogging()
    this.#initExpressConfig()
    this.#initCookieConfig()
    this.#initSessionConfig()
    this.#initClusterConfig()
    this.#initIntegrateThirdParty()
  }

  initRouters(routers: ServerRouters[]) {
    this.routers = routers
  }

  #useRouters() {
    this.routers.forEach(({ endPoint, router }) => {
      this.app.use(endPoint, router)
    })
  }

  useMiddlewares() {
    this.#useRouters()
  }

  startExpressSingleServer() {
    this.server.listen(this.port, this.hostname, () => {
      console.log(
        `Start server on ${process.env.SERVER_ENV} mode at http://${this.hostname}:${this.port}`,
      )
    })
  }

  startExpressClusterServer() {
    require('os').cpus().forEach(this.#startWorker)

    cluster.on('disconnect', (worker) =>
      console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`),
    )

    cluster.on('exit', (worker, code, signal) => {
      console.log(`CLUSTER: Worker ${worker.id} died with exit ` + `code ${code} (${signal})`)
      this.#startWorker()
    })
  }

  startServer(mode: 'single' | 'cluster' = 'single') {
    if (mode === 'single') {
      this.startExpressSingleServer()
    } else {
      if (cluster.isMaster) {
        this.startExpressClusterServer()
      } else {
        this.startExpressSingleServer()
      }
    }
  }
}
