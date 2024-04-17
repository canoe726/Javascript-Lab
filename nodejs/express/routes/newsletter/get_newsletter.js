exports.newsletter = (req, res) => {
  res.render('newsletter', {
    csrf: 'CSRF token goes here',
  })
}

exports.newsletterThankYou = (req, res) => {
  res.render('newsletter-signup-thank-you')
}
