const http = require('http')
const hostname = '127.0.0.1'
const port = '4000'

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />

            <title>render</title>
        </head>
        <body>
            <div id="root">123123</div>
        </body>
    </html>
    `)
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
  })
