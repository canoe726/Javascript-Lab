var testModule = require('./test-module.js')
testModule.test()

delete require.cache[require.resolve('./test-module.js')]

var testModule = require('./test-module.js')
testModule.test()
