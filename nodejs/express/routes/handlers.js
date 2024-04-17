const { home } = require('./home/home')
const { about } = require('./about/about')
const { greeting } = require('./greeting/greeting')
const { sectionTest } = require('./section-test/sectionTest')
const { newsletter } = require('./newsletter/get_newsletter')
const { newsletterSubmit } = require('./newsletter/post_newsletter')
const { notFound, serverError } = require('./exceptions/exceptions')
const { fiftyFiftyMiddleware, fiftyFifty } = require('./fifty-fifty/fifty-fifty')
const { setCurrency, setCurrencyMiddleware } = require('./set-currency/set-currency')
const { fail } = require('./fail/fail')
const { epicFail } = require('./epic-fail/epic-fail')
const { getVacationsApi } = require('./api/vacations/get-vacations')
const { postVacationPhotoContestApi } = require('./api/vacations/post-vacations')
const { postNewsletterSignupApi } = require('./api/newsletter/post-newsletter')

exports.getRoutes = (app) => {
  app.get('/', home)
  app.get('/about', about)
  app.get('/greeting', greeting)
  app.get('/section-test', sectionTest)
  app.get('/newsletter', newsletter)
  app.get('/fifty-fifty', fiftyFiftyMiddleware, fiftyFifty)
  app.get('/set-currency', setCurrency)
  app.get('/set-currency/:currency', setCurrencyMiddleware)
  app.get('/fail', fail)
  app.get('/epic-fail', epicFail)
  /* -------------------------------------------------------------------------- */
  /*                                     API                                    */
  /* -------------------------------------------------------------------------- */
  app.get('/api/vacations', getVacationsApi)
}

exports.postRoutes = (app) => {
  app.post('/newsletter', newsletterSubmit)
  /* -------------------------------------------------------------------------- */
  /*                                     API                                    */
  /* -------------------------------------------------------------------------- */
  app.post('/api/vacation-photo', postVacationPhotoContestApi)
  app.post('/api/newsletter-signup', postNewsletterSignupApi)
}

exports.exceptionRoutes = (app) => {
  app.use(notFound)
  app.use(serverError)
}
