const fs = require('fs')

module.exports = function customHandler(path, missingmsg, directorymsg) {
  if (arguments.length < 3) {
    throw new Error('missing parameter in customHandler')
  }

  return function customHandler(req, res, next) {
    const pathname = path + req.url
    console.log('pathname: ', pathname)
    fs.stat(pathname, function (err, stats) {
      if (err) {
        res.writeHead(404)
        res.write(missingmsg)
        res.end()
      } else if (!stats.isFile()) {
        res.writeHead(403)
        res.write(directorymsg)
        res.end()
      } else {
        next()
      }
    })
  }
}
