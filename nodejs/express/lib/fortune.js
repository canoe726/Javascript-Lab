const fortuneCookies = ['1', '2', '3', '4', '5', '6', 'Lucky']

exports.getFortune = () => {
  const ids = Math.floor(Math.random() * fortuneCookies.length)
  return fortuneCookies[ids]
}
