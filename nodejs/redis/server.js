const net = require('net')
const fs = require('fs')
const pug = require('pug')
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
  await client.connect()
  client.on('error', function (err) {
    console.log('redis error: ', err)
  })
  // client.select(dbNumber)

  conn.on('data', function (data) {
    console.log(`${data}`)

    // try {
    //   const obj = JSON.parse(data)
    //   console.log('obj: ', obj)

    //   client.hSet(obj?.member, 'first_name', obj?.first_name, redis.print)

    //   client.zAdd('Zowie!', parseInt(obj?.score), obj?.member)

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
