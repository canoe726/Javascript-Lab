const { spawn } = require('child_process')
const net = require('net')

const client = new net.Socket()
client.setEncoding('utf-8')

client.connect('3000', function () {
  console.log('connected to message-queue-server')
})

const logs = spawn('tail', ['-f', './access.log'])

logs.stdout.setEncoding('utf-8')
logs.stdout.on('data', function (data) {
  const logData = data.split('\n')

  logData?.forEach((logItem) => {
    const urlRegex = /GET\s(\S+)\sHTTP/g
    const imageRegex = /\.gif|\.png|\.jpg|\.svg/

    const parts = urlRegex.exec(logItem)
    const tests = imageRegex.test(parts?.[1])
    if (tests && parts?.[1]) {
      console.log('parts: ', parts?.[1])
      client.write(`${parts[1]}\n`)
    }
  })

  logs.kill()
})

logs.stderr.on('data', function (data) {
  console.log('stderr: ', data)
})

logs.on('exit', function (code) {
  console.log('child process exited with code ', code)
  client.end()
})
