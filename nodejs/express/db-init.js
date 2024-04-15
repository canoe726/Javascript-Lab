const { Client } = require('pg')
const { postgresConfig } = require('./.credentials.json')

const client = new Client(postgresConfig)

const createScripts = [
  `
    CREATE TABLE IF NOT EXISTS vacations (
      name varchar(200) NOT NULL,
      slug varchar(200) NOT NULL UNIQUE,
      category varchar(50),
      sku varchar(20),
      description text,
      location_search varchar(100) NOT NULL,
      location_lat double precision,
      location_lng double precision,
      price money,
      tags jsonb,
      in_season boolean,
      available boolean,
      requires_waiver boolean,
      maximum_guests integer,
      notes text,
      packages_sold integer
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS vacation_in_season_listeners (
      email varchar(200) NOT NULL,
      sku varchar(20) NOT NULL,
      PRIMARY KEY (email, sku)
    )
`,
]

const getVacationCount = async (client) => {
  const { rows } = await client.query('SELECT COUNT(*) FROM VACATIONS')
  return Number(rows[0].count)
}

const seedVacations = async (client) => {
  const sql = `
    INSERT INTO vacations(
      name,
      slug,
      category,
      sku,
      description,
      location_search,
      price,
      tags,
      in_season,
      available,
      requires_waiver,
      maximum_guests,
      notes,
      packages_sold
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  `

  await client.query(sql, [
    'Hood River Day Trip',
    'hood-river-day-trip',
    'Day Trip',
    'HR199',
    'Spend a day sailing on the Columbia and enjoying craft beers in Hood Rivers',
    'Hood River, Oregon, USA',
    99.95,
    '["day trip", "hood river", "sailing", "windsurfing", "breweries"]',
    true,
    true,
    false,
    16,
    null,
    0,
  ])
}

client.connect().then(async () => {
  try {
    const promises = await createScripts.map(async (createScript) => {
      await client.query(createScript)
    })

    await Promise.all(promises)
    console.log('creating database schema')
    const vacationCount = await getVacationCount(client)
    if (vacationCount === 0) {
      console.log('seeding vacations')
      await seedVacations(client)
    }
  } catch (error) {
    console.error('ERROR: could not initialize database')
    console.error(error.message)
  } finally {
    client.end()
  }
})
