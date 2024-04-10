const fortune = require('../fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() })

exports.greeting = (req, res) =>
  res.render('greeting', {
    message: 'Hello programmer',
    userid: req?.cookies?.userid,
  })

exports.sectionTest = (req, res) => res.render('section-test')

exports.newsletter = (req, res) =>
  res.render('newsletter', {
    csrf: 'CSRF token goes here',
  })

exports.api = {
  newsletterSignup: (req, res) => {
    console.log('Form (from querystring): ', req.query.form)
    console.log('CSRF token (from hidden form field): ', req.body._csrf)
    console.log('Name (from visible from field)): ', req.body.name)
    console.log('Email (from hidden form field): ', req.body.email)
    res.send({ result: 'success' })
    // res.redirect(303, '/newsletter-signup-thank-you')
  },
}

exports.newsletterThankYou = (req, res) => res.render('newsletter-signup-thank-you')

exports.notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.error('** SERVER ERROR: ' + err?.message)
  res.render('500')
}
/* eslint-enable no-unused-vars */
