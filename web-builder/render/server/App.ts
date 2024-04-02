import * as fs from 'fs'
import * as http from 'http'
import * as path from 'path'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import RenderServerDOM from './RenderServerDOM.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PORT = 3000
const HOSTNAME = '127.0.0.1'

class ServerApplication {
  server = undefined
}

let server: http.Server | null = null

function watchDirectories(
  dir: string,
  watchCallback: (filename: string | null, filePath: string) => void,
) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Error reading directory: ', err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats: ', err)
          return
        }

        if (stats.isDirectory()) {
          watchDirectories(filePath, watchCallback)
        } else {
          fs.watch(filePath, (_, filename) => {
            watchCallback(filename, filePath)
          })
        }
      })
    })
  })
}

function connectDevServerWithSocket() {
  if (server) {
    const io = new Server(server)
    io.on('connection', (socket) => {
      console.log('Client connected: ')

      watchDirectories(path.join(__dirname, './client/src'), (filename, filePath) => {
        const file = fs.readFileSync(filePath)
        const fileContent = file.toString()
        socket.emit('/debug/render', fileContent)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  } else {
    console.error('Failed to load server instance')
  }
}

function startServer() {
  if (server) {
    server = null
  }
  server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const indexPath = path.resolve(__dirname, './static/index.html')
    const html = fs.readFileSync(indexPath, 'utf-8')

    res.end(html.replace('__RENDER__', RenderServerDOM.render()))
  })

  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`)
  })

  connectDevServerWithSocket()
}

function main() {
  startServer()
}

main()
