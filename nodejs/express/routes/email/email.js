const { email } = require('./EmailClass')

exports.email = (req, res) => {
  const myEmail = email.getInstance()
  myEmail.sendEmail('', '', '', '')
}
