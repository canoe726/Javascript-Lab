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

exports.index = function getIndex(req, res, next) {
  res.render('index', { title: 'Express' })
}

exports.stats = async function getStats(req, res, next) {
  try {
    const client = await getRedisClient()

    const result = client.multi().sMembers('ip').hGetAll('myurls')
    const execResult = await result.exec(function (err, results) {
      if (err) {
        console.log('router /stats error: ', err)
        return next(err)
      }

      console.log('results: ', results)
      const ips = results[0] ?? []
      const urls = results[1] ?? []

      res.render('stats', {
        title: 'Stats',
        ips,
        urls,
      })

      client.quit()
    })
    console.log(execResult[0], execResult[1])

    res.render('stats', {
      title: 'Stats',
      ips: execResult[0],
      urls: execResult[1],
    })
  } catch (err) {
    console.log('stats client: ', err)
    next()
  }
}
