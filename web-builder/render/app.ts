import { spawn } from 'child_process'
import * as http from 'http'

let server: http.Server | null = null

const PORT = 8080
const HOSTNAME = '127.0.0.1'

const renderServer = spawn('pwd')

renderServer.stdout

function runServer() {
  if (server) {
    server = null
  }
  server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' })

    res.end('hello')
  })

  server.listen(PORT, HOSTNAME, () => {
    console.log(`Watch Server is listening at http://${HOSTNAME}:${PORT}`)
  })
}

function main() {
  runServer()
}

main()
