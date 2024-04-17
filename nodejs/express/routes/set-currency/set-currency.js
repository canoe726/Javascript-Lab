exports.setCurrency = (req, res) => {
  const currency = req.session.currency
  console.log('req.session:', currency)
  const context = {}

  switch (currency) {
    case 'USD':
      context.currencyUSD = 'selected'
      break
    case 'BTC':
      context.currencyBTC = 'selected'
      break
  }

  res.render('set-currency', context)
}

exports.setCurrencyMiddleware = (req, res) => {
  console.log(req.params)
  req.session.currency = req.params.currency
  return res.redirect(303, '/set-currency')
}
