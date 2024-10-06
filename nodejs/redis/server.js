const net = require('net')
const redis = require('redis')

const username = 'default'
const password = 'ro66JS2NFNWmrtY72mZhYgd78ZLA1hSK'
const host = 'redis-10301.c257.us-east-1-3.ec2.redns.redis-cloud.com:10301'
const dbNumber = 16

const server = net.createServer(async function (conn) {
  console.log('클라이언트 연결됨:', conn.remoteAddress, conn.remotePort)

  const client = redis.createClient({
    url: `redis://${username}:${password}@${host}`,
  })
  client.on('error', function (err) {
    console.log('redis error: ', err)
  })
  await client.connect()

  conn.on('data', function (data) {
    console.log(`${data}`)

    client.hSet('test', 'first_name', 'love')
    client.zAdd('Zowie!', {
      score: 10000,
      value: 'test',
    })
    // try {
    //   const obj = JSON.parse(data)
    //   console.log('obj: ', obj)

    //   renderDashboard(conn)
    // } catch (err) {
    //   console.log('data error: ', err)
    // }
  })

  conn.on('close', function () {
    console.log('client connection is closed')
    client.quit()
  })
})

server.on('error', function (err) {
  console.log('server error: ', err)
})

server.listen(8124, function () {
  console.log('listening on port 8124')
})
