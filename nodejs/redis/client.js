const net = require('net')
const pug = require('pug')

// 더미 데이터 (테스트용)
const scoresData = [
  { score: 1500, first_name: 'John', last_name: 'Doe', date: '2023-10-01' },
  { score: 1400, first_name: 'Jane', last_name: 'Smith', date: '2023-10-02' },
  { score: 1350, first_name: 'Jack', last_name: 'Sparrow', date: '2023-10-03' },
]

const server = net.createServer(function (conn) {
  console.log('dashboard connected')

  const compiledFunction = pug.compileFile('./dashboard.pug')
  const html = compiledFunction({ scores: scoresData })

  conn.write(Buffer.from(`HTTP/1.1 200 OK\r\n`))
  conn.write(Buffer.from(`Content-Type: text/html;\r\n`))
  conn.write(Buffer.from(`\r\n`))
  conn.write(html)
  conn.write(Buffer.from(`\r\n`))
  conn.end()
})

server.on('error', function (err) {
  console.log('server error: ', err)
})

server.listen(8125, function () {
  console.log('listening on port 8125')
})
