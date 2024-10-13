const { MongoClient, ServerApiVersion } = require('mongodb')
const PASSWORD = ''
const uri = `mongodb+srv://youngkim:${PASSWORD}@cluster0.anutw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    console.log('You successfully connected to MongoDB!')
    await client.connect()
    const database = client.db('exampleDb')
    const collection = database.collection('widgets')

    const deleteResult = collection.deleteMany()
    console.log(`${(await deleteResult).deletedCount}: documents were deleted`)

    const docs = [
      {
        title: 'First great widget',
        desc: 'greatest widget of all',
        price: 14.99,
      },
      {
        title: 'Second great widget',
        desc: 'second greatest widget of all',
        price: 29.99,
      },
    ]
    const insertResult = await collection.insertMany(docs)
    console.log(`${insertResult.insertedCount}: documents were inserted`)
  } finally {
    await client.close()
  }
}
run().catch(console.dir)
