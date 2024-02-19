const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test-note',
  password: '******',
  port: '5432',
})

async function main() {
  await client.connect()

  try {
    const res = await client.query('SELECT * FROM board')
    console.log('res: ', res.rows)
  } catch (err) {
    console.error(err)
  } finally {
    // await client.end()
  }
}

main()
