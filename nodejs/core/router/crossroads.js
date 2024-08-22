const crossroads = require('crossroads')
const http = require('http')

const typeRoute = crossroads.addRoute('/{type}/{id}')

const onTypeAccess = (type, id) => {
  console.log('access ' + type + ' ' + id)
}

typeRoute.matched.add(onTypeAccess)

crossroads.addRoute('/category/{type}/:pub:/:id:', function (type, pub, id) {
  console.log(type, pub, id)

  if (!id && !pub) {
    console.log('Accessing all entries of category ' + type)
    return
  } else if (!id) {
    console.log('Accessing all entries of category ' + type + ' and pub ' + pub)
    return
  } else {
    console.log(
      'Accessing all entries of category ' + type + ' and pub ' + pub,
      ' of category ',
      type,
    )
  }
})

http
  .createServer(function (req, res) {
    console.log(req.url)
    crossroads.parse(req.url)
    res.end("and that's all\n")
  })
  .listen(8124)
