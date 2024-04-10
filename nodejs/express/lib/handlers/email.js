const nodemailer = require('nodemailer')
const credentials = require('../../.credentials.json')

const mailTransport = nodemailer.createTransport({
  auth: {
    user: credentials['msa-user'],
    user: credentials['msa-password'],
  },
})

class Email {
  constructor() {
    if (this.email === null) {
      this.email = new Email()
      return this.email
    } else {
      return this.getInstance()
    }
  }

  getInstance() {
    return this.email
  }

  async sendEmail(from, to, subject, message) {
    let resMessage = ''
    try {
      const result = await mailTransport.sendMail({
        from,
        to,
        subject,
        text,
      })
      resMessage = 'mail sent successfully : ' + result
    } catch (err) {
      resMessage = 'could not send email : ' + err.message
    }
    res.send(resMessage)
  }
}

const emailInstance = new Email()

exports.email = emailInstance
