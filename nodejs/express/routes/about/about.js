const { getFortune } = require('../../lib/fortune')

exports.about = (req, res) => {
  res.render('about', { fortune: getFortune() })
}
