const http = require('http')
const fs = require('fs')
const WebSocket = require('ws')

const PORT = 3000
const HOSTNAME = '127.0.0.1'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(getHtmlContent())
})

const wss = new WebSocket.Server({ server })
wss.on('connection', (ws) => {
  ws.send(getHtmlContent())

  fs.watch('./server/index.js', (event, filename) => {
    if (event === 'change') {
      ws.send(getHtmlContent())
    }
  })
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`)
})

function getHtmlContent() {
  const { renderHTML } = require('./server/index.js')
  return renderHTML()
}
