var _ = require('underscore')
_.each(['apply', 'cherry'], function (fruit) {
  console.log(fruit)
})

_.mixin({
  betterWithNode: function (str) {
    return str + ' is better with node'
  },
})

console.log(_.betterWithNode('chocolate'))
