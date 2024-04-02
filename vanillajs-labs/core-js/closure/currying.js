var curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b)
    }
  }
}

var getMaxWith10 = curry3(Math.max)(10)
console.log(getMaxWith10(5))
console.log(getMaxWith10(25))

var curry5 = (func) => (a) => (b) => (c) => (d) => (e) => func(a, b, c, d, e)
console.log(curry5(Math.max)(2)(4)(12)(24)(6))

var getInformation = function (baseUrl) {
  return function (path) {
    return function (id) {
      return fetch(baseUrl + path + '/' + id)
    }
  }
}
var imageUrl = 'https://imageAddress.com/'

var getImage = getInformation(imageUrl)
var getEmoticon = getImage('emoticon')
var getIcon = getImage('icon')

var emoticon1 = getEmoticon('1')
var icon1 = getIcon('200')
