;(function () {
  var coffeeList = ''

  var addEspresso = function (name) {
    coffeeList = name
    console.log(coffeeList)
    setTimeout(addAmericano, 300, '아메리카노')
  }

  var addAmericano = function (name) {
    coffeeList += ', ' + name
    console.log(coffeeList)
  }

  setTimeout(addEspresso, 300, '에스프레소')
})()
