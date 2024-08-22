var express = require('express')
var router = express.Router()

function getIndex(req, res, next) {
  res.render('index', { title: 'Express' })
}

/* GET home page. */
router.get('/', errorAsyncController(getIndex))

module.exports = router
