const net = require('net')
const redis = require('redis')

let connectId = 0

const getRedisClient = async () => {
  const username = 'default'
  const password = 'ro66JS2NFNWmrtY72mZhYgd78ZLA1hSK'
  const host = 'redis-10301.c257.us-east-1-3.ec2.redns.redis-cloud.com:10301'

  const redisClient = redis.createClient({
    url: `redis://${username}:${password}@${host}`,
  })
  redisClient.on('error', function (err) {
    console.log('redis error: ', err)
  })
  await redisClient.connect()
  return redisClient
}

const server = net.createServer(async function (conn) {
  conn.id = connectId++
  console.log('connected ', conn.id)

  const client = await getRedisClient()

  conn.on('data', (data) => {
    console.log(`${data} from ${conn.remoteAddress} ${conn.remotePort}`)

    client.rPush('images', data)
  })

  conn.on('end', () => {
    console.log(`connection ${connectId} ended`)
  })

  conn.on('close', function (err) {
    client.quit()
  })
})

server.on('error', function (err) {
  console.log('server error: ', err)
})

server.listen(3000, function () {
  console.log('listening on port http://localhost:3000')
})
