const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() })

exports.greeting = (req, res) =>
  res.render('greeting', {
    message: 'Hello programmer',
    userid: req?.cookies?.userid,
  })

exports.notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.error('** SERVER ERROR: ' + err?.message)
  res.render('500')
}
/* eslint-enable no-unused-vars */
