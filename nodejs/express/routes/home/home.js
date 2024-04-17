exports.home = (req, res) => {
  res.clearCookie('monster')

  res.cookie('monster', 'nom nom')
  res.cookie('signed_monster', 'nom nom', { signed: true })
  res.render('home')
}
