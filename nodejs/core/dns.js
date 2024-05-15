const dns = require('dns')
const url = require('url')
const querystring = require('querystring')

dns.lookup('react.dev', function (err, ip) {
  if (err) throw err
  console.log('ip: ', ip)

  dns.reverse(ip, function (err, domains) {
    console.log('domains: ', domains)
    domains?.forEach(function (domain) {
      console.log(domain)
    })
  })
})

const urlObj = url.parse('http://examples.burningbird.net:8124/?file=main')
const qs = querystring.parse('file=main&file=secondary&type=html')
console.log('url object: ', urlObj)
console.log('url format: ', url.format(urlObj))
console.log('url qs: ', qs)
