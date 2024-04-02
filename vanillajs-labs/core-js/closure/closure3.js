var createCar = function () {
  var fuel = Math.ceil(Math.random() * 10 + 10)
  var power = Math.ceil(Math.random() * 3 + 2)
  var moved = 0

  var publicMembers = {
    get moved() {
      return moved
    },
    run: function () {
      var km = Math.ceil(Math.random() * 6)
      var wastedFuel = km / power
      if (fuel < wastedFuel) {
        console.log('이동 불가')
        return
      }
      fuel -= wastedFuel
      moved += km
      console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel)
    },
  }
  Object.freeze(publicMembers) // configurable: false, writable: false

  return publicMembers
}

var car = createCar()
car.run = null
car.run()
console.log(car.moved)
console.log(car.fuel)

car.fuel = 1000
console.log(car.fuel)

car.run()

console.log(car)
