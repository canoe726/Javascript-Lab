const cluster = require('cluster')
const express = require('express')
const { Pool } = require('pg')

const { database } = require('./credentials.json')

const app = express()
const PORT = 4000

const pool = new Pool(database)
pool.connect((err) => {
  if (err) {
    console.log('Failed to connect db : ', err)
  } else {
    console.log('Connect to db done!')
  }
})

app.get('/plus', async (req, res) => {
  try {
    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      const result = await client.query('UPDATE counter SET count = count + 1 RETURNING count')
      const newCount = result.rows?.[0]?.count
      await client.query('COMMIT')

      process.send({ message: '처리중...', pid: cluster.worker.process.pid })
      console.log(`[${cluster.worker.process.pid}] Count increased to ${newCount}`)
      res.status(200).json({ count: newCount })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error(`Error executing query: `, error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT, () => {
  console.log(`[${cluster.worker.process.pid}] Server is listening on http://localhost:${PORT}`)
})
