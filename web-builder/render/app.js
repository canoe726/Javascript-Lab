import fs from 'fs'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import RenderServerDOM from './server/RenderServerDOM.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PORT = 3000
const HOSTNAME = '127.0.0.1'

function watchClientFileChange() {
  fs.watch('./client/src', 'utf-8', (event, filename) => {
    if (event === 'change') {
      restartServer()
    }
  })
}

let server = undefined

function restartServer() {
  if (server) {
    server.close(() => {
      console.log('Restart server...')
      startServer()
    })
  } else {
    startServer()
  }
}

function startServer() {
  server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const indexPath = path.resolve(__dirname, './static/index.html')
    const html = fs.readFileSync(indexPath, 'utf-8')
    res.end(html.replace('__RENDER__', RenderServerDOM.render()))
  })

  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`)
  })
}

function main() {
  watchClientFileChange()
  startServer()
}

main()
