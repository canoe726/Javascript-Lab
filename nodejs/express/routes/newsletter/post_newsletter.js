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
