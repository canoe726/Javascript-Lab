const { createClient } = require('redis')
const { redis } = require('../../.credentials.json')
const { default: RedisStore } = require('connect-redis')

class RedisDatabase {
  redisClient = null
  redisStore = null

  constructor() {
    if (this.redisClient) {
      return this.redisClient
    }
    this.redisClient = createClient({
      url: redis.url,
    })
  }

  initRedis() {
    this.redisClient.connect().catch(console.error)

    this.redisClient.on('connect', () => {
      console.info('Redis connected!')
    })
    this.redisClient.on('error', (err) => {
      console.error('Redis Client Error', err)
    })
  }

  getRedisStore() {
    if (this.redisStore) {
      return this.redisStore
    }
    this.redisStore = new RedisStore({
      client: this.redisClient,
      prefix: 'express-session:',
    })
  }
}

exports.RedisDatabase = RedisDatabase
