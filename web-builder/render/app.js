import fs from 'fs'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import RenderServerDOM from './server/RenderServerDOM.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PORT = 3000
const HOSTNAME = '127.0.0.1'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })

  const indexPath = path.resolve(__dirname, './static/index.html')
  const html = fs.readFileSync(indexPath, 'utf-8')

  res.end(html.replace('__RENDER__', RenderServerDOM.render()))
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`)
})
