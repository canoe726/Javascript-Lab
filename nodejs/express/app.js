const express = require('express')
const { engine } = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.type('text/html')
  res.render('home')
})

app.get('/about', (req, res) => {
  const fortunes = ['1', '2', '3', '4', '5', '6', 'Lucky']
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]

  res.type('text/html')
  res.render('about', { fortune: randomFortune })
})

app.use(express.static(__dirname + '/public'))

app.use((req, res) => {
  res.type('text/html')
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.render('500')
})

app.listen(port, () => {
  console.log(`Start server on http://localhost:${port}`)
})
