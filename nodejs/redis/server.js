const net = require('net')
const redis = require('redis')

const username = 'default'
const password = 'ro66JS2NFNWmrtY72mZhYgd78ZLA1hSK'
const host = 'redis-10301.c257.us-east-1-3.ec2.redns.redis-cloud.com:10301'

const scoresData = [
  { member: 400, score: 1500, first_name: 'John', last_name: 'Doe', date: '2023-10-01' },
  { member: 401, score: 1400, first_name: 'Jane', last_name: 'Smith', date: '2023-10-02' },
  { member: 402, score: 1350, first_name: 'Bob', last_name: 'Johnson', date: '2023-10-03' },
  { member: 403, score: 1400, first_name: 'Mike', last_name: 'Choi', date: '2023-10-02' },
  { member: 404, score: 1150, first_name: 'Kim', last_name: 'Sung', date: '2023-10-03' },
  { member: 405, score: 1900, first_name: 'So', last_name: 'Ri', date: '2023-10-02' },
  { member: 406, score: 2050, first_name: 'Donald', last_name: 'Trump', date: '2023-10-03' },
]

const server = net.createServer(async function (conn) {
  console.log('redis client connected! :', conn.remoteAddress, conn.remotePort)

  const client = redis.createClient({
    url: `redis://${username}:${password}@${host}`,
  })
  client.on('error', function (err) {
    console.log('redis error: ', err)
  })
  await client.connect()

  conn.on('data', async function (data) {
    scoresData.forEach(({ member, score, first_name, last_name, date }) => {
      const memberKey = String(member)

      client.hSet(memberKey, 'first_name', first_name)
      client.hSet(memberKey, 'last_name', last_name)
      client.hSet(memberKey, 'score', score)
      client.hSet(memberKey, 'date', date)

      client.zAdd('Zowie!', {
        score: score,
        value: memberKey,
      })
    })

    conn.write(Buffer.from(`HTTP/1.1 200 OK\r\n`))
    conn.write(Buffer.from(`Content-Type: text/html;\r\n`))
    conn.write(Buffer.from(`\r\n`))
    conn.write('data set is finished')
    conn.write(Buffer.from(`\r\n`))
    conn.end()
  })

  conn.on('close', async function () {
    console.log('client connection is closed')
    await client.quit()
  })
})

server.on('error', function (err) {
  console.log('server error: ', err)
})

server.listen(8124, function () {
  console.log('listening on port http://localhost:8124')
})
