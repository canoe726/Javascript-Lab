exports.fiftyFiftyMiddleware = (req, res, next) => {
  if (Math.random() < 0.5) return next()
  return res.send('sometimes this')
}

exports.fiftyFifty = (req, res) => {
  return res.send('and sometimes that')
}
