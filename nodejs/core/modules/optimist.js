#!/usr/local/bin/node
// which node -> `chmod a+x optimist.js` -> 단독으로 실행가능 `./optimist -o 1 -t 2`
var argv = require('optimist').argv

console.log(argv.o + ' ' + argv.t)

// node optimist.js -o 1 -t 2
