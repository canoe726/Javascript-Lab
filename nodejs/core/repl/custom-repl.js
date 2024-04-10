#!/usr/local/bin/node

const repl = require('repl')
const net = require('net')

// repl.start([prompt], [stream], [eval], [useGlobal], [ignoreUndefined])
function eval(cmd, callback) {
  callback(null, result)
}

const context = repl.start('node via stdin> ', null, null, null, true).context

context.http = require('http')
context.util = require('util')
context.os = require('os')

net
  .createServer(function (socket) {
    repl.start('node via TCP socket> ', socket)
  })
  .listen(8124)
// nc localhost 8124
