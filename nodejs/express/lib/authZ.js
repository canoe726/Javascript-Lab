module.exports = {
  customerOnly: (req, res, next) => {
    if (req.user && req.user.role === 'customer') {
      return next()
    }
    res.redirect(303, '/unauthorized')
  },
  employeeOnly: (req, res, next) => {
    if (req.user && req.user.role === 'employee') {
      return next()
    }
    next('route')
  },
  allow: (roles) => (req, res, next) => {
    if (req.user && roles.split(',').includes(req.user.role)) {
      return next()
    }
    res.redirect(303, '/unauthorized')
  },
}
