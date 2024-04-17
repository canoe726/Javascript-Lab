exports.notFound = (req, res) => {
  res.render('404')
}

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.error('** SERVER ERROR: ' + err?.message)
  res.render('500')
}
/* eslint-enable no-unused-vars */
