const colors = require('colors')

colors.setTheme({
  mod1_warn: 'cyan',
  mod1_error: 'red',
})

console.log('This Node kicks it!'.rainbow.underline)
console.log('rainbow'.rainbow, 'zebra'.zebra)

console.log('This is error message'.mod1_error)
