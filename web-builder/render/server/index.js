function renderHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Auto Reload Example</title>
      </head>
      <body>
        <div id="content">123123123</div>

        <script>
          const socket = new WebSocket('ws://localhost:3000')

          socket.addEventListener('message', (event) => {
            // 서버로부터 받은 HTML 내용을 적용
            document.getElementById('content').innerHTML = event.data
          })
        </script>
      </body>
    </html>
    `
}

module.exports = {
  renderHTML,
}

// const http = require('http')
// const fs = require('fs')
// const WebSocket = require('ws')

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   res.end(getHtmlContent())
// })

// const wss = new WebSocket.Server({ server })

// wss.on('connection', (ws) => {
//   ws.send(getHtmlContent())

//   // 파일 변경 감지
//   fs.watch('index.html', (event, filename) => {
//     if (event === 'change') {
//       // 변경된 HTML 내용을 클라이언트에 전송
//       ws.send(getHtmlContent())
//     }
//   })
// })

// const PORT = 3000

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`)
// })

// function getHtmlContent() {
//   return fs.readFileSync('index.html', 'utf8')
// }
