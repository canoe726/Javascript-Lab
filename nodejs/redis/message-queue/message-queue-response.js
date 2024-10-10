const http = require('http')
const redis = require('redis')

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

const server = http.createServer()

server.on('request', async function (req, res) {
  const client = await getRedisClient()

  client.on('error', function (err) {
    console.log('redis error: ', err)
  })

  try {
    const popData = await client.lPop('images')
    console.log(popData)
    res.end(`message response:\n${popData}`)
    client.quit()
  } catch (err) {
    console.error('lPop err: ', err)
    client.quit()
  }
})

server.listen(8124, function () {
  console.log('listening on http://localhost:8124')
})
