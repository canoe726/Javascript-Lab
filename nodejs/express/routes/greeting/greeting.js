exports.greeting = (req, res) => {
  res.render('greeting', {
    message: 'Hello programmer',
    userid: req?.cookies?.userid,
  })
}
