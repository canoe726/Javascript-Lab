const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = (app, options) => {
  if (!options.successRedirect) {
    options.successRedirect = '/account'
  }
  if (!options.failureRedirect) {
    options.failureRedirect = '/login'
  }
  return {
    init: function () {
      passport.use(
        new LocalStrategy(function (username, password, done) {
          // User.findOne({ username }, function (err, user) {
          //   if (err) {
          //     return done(err)
          //   }
          //   if (!user) {
          //     return done(null, false)
          //   }
          //   if (!user.verifyPassword(password)) {
          //     return done(null, false)
          //   }
          //   return done(null, user)
          // })
        }),
      )

      app.use(passport.initialize())
      app.use(passport.session())
    },
    registerRoutes: function () {
      app.get('/auth/local', (req, res, next) => {
        if (req.query.redirect) {
          req.session.authRedirect = req.query.redirect
        }
        passport.authenticate('local')(req, res, next)
      })

      app.get(
        '/auth/local/callback',
        passport.authenticate(
          'local',
          {
            failureRedirect: options.failureRedirect,
          },
          (req, res) => {
            // success authentication
            const redirect = req.session.authRedirect
            if (redirect) {
              delete req.session.authRedirect
            }
            res.redirect(303, redirect || options.successRedirect)
          },
        ),
      )
    },
  }
}
