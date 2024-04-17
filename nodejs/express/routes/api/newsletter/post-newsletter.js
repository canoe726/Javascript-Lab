exports.postNewsletterSignupApi = (req, res) => {
  console.log('Form (from querystring): ', req.query.form)
  console.log('CSRF token (from hidden form field): ', req.body._csrf)
  console.log('Name (from visible from field)): ', req.body.name)
  console.log('Email (from hidden form field): ', req.body.email)
  res.send({ result: 'success' })
  // res.redirect(303, '/newsletter-signup-thank-you')
}
