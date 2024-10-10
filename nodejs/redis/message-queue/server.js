const express = require('express')
const statsMiddleware = require('./stats')

const app = express()
const routes = require('./router')

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', routes.index)
app.get('/stats', statsMiddleware(), routes.stats)

app.listen(3000, () => {
  console.log('express server is listening http://localhost:3000')
})
