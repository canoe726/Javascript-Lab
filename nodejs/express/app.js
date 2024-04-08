const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

const handlers = require('./lib/handlers')

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', handlers.home)
app.get('/about', handlers.about)

app.use(handlers.notFound)
app.use(handlers.serverError)
app.use(express.static(path.join(__dirname, '/public')))

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Start server on http://localhost:${port}`)
  })
} else {
  module.exports = app
}
