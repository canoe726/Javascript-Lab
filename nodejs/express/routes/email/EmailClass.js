const nodemailer = require('nodemailer')
const credentials = require('../../.credentials.json')

const mailTransport = nodemailer.createTransport({
  auth: {
    user: credentials['msa-user'],
    password: credentials['msa-password'],
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
        text: message,
      })
      resMessage = 'mail sent successfully : ' + result
    } catch (err) {
      resMessage = 'could not send email : ' + err.message
    }
    console.log(resMessage)
    // res.send(resMessage)
  }
}

const emailInstance = new Email()

exports.email = emailInstance
