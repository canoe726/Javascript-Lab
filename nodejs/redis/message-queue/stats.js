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

module.exports = function getStats() {
  return async function getStats(req, res, next) {
    const client = await getRedisClient()

    client.on('error', function (err) {
      console.log('redis stats error: ', err)
    })

    console.log('req.socket.remoteAddress: ', req.socket.remoteAddress)

    client.sAdd('ip', req.socket.remoteAddress)
    client.hIncrBy('myurls', req.url, 1)
    client.quit()

    console.log('middleware finish')
    next()
  }
}
