import * as dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { polyfillRouter } from './dynamic-polyfill'
dotenv.config({ path: `${path.resolve(__dirname, '..')}/.env` })

const app = express()
const port = process.env.SERVER_PORT || 5000

app.use('/api/dynamic-polyfill', polyfillRouter)

app.listen(port, () => {
  console.log(`Server is listening port: ${port}`)
})
