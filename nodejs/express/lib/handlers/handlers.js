const path = require('path')
const fs = require('fs')
const fortune = require('../fortune')

exports.home = (req, res) => {
  res.clearCookie('monster')

  res.cookie('monster', 'nom nom')
  res.cookie('signed_monster', 'nom nom', { signed: true })
  res.render('home')
}

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

exports.newsletterSubmit = (req, res) => {
  // const name = req.body.name
  const email = req.body.email

  if (email === 'test') {
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error',
      message: 'The email address you entered was not valid',
    }
    return res.redirect(303, '/newsletter')
  }
}

exports.newsletterThankYou = (req, res) => res.render('newsletter-signup-thank-you')

exports.api = {
  newsletterSignup: (req, res) => {
    console.log('Form (from querystring): ', req.query.form)
    console.log('CSRF token (from hidden form field): ', req.body._csrf)
    console.log('Name (from visible from field)): ', req.body.name)
    console.log('Email (from hidden form field): ', req.body.email)
    res.send({ result: 'success' })
    // res.redirect(303, '/newsletter-signup-thank-you')
  },
  vacationPhotoContest: async (req, res, fields, files) => {
    const dataDir = path.resolve(__dirname, '../..', 'public/images')
    const vacationPhotoDir = path.join(dataDir, 'vacation-photos')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir)
    }
    if (!fs.existsSync(vacationPhotoDir)) {
      fs.mkdirSync(vacationPhotoDir)
    }

    // const photo = files.photo[0]
  },
}

exports.notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.error('** SERVER ERROR: ' + err?.message)
  res.render('500')
}
/* eslint-enable no-unused-vars */
