var Rectangle = function (width, height) {
  this.width = width
  this.height = height
}
// prototype method
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}

var Square = function (width) {
  Rectangle.call(this, width, width)
}

var extendClass2 = (function () {
  var Bridge = function () {}
  return function (SuperClass, SubClass, subMethods) {
    Bridge.prototype = SuperClass.prototype
    SubClass.prototype = new Bridge()
    if (subMethods) {
      for (var method in subMethods) {
        SubClass.prototype[method] = subMethods[method]
      }
    }
    Object.freeze(SubClass.prototype)
    return SubClass
  }
})()

// var Bridge = function () {}
// Bridge.prototype = Rectangle.prototype
// Square.prototype = new Bridge()
// Object.freeze(Square.prototype)

var Square = extendClass2(Rectangle, function (width) {
  Rectangle.call(this, width, width)
})
var square = new Square(3)

console.log(square.getArea())
