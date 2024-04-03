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

var extendClass3 = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = Object.create(SuperClass.prototype)
  SubClass.prototype.constructor = SubClass

  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method]
    }
  }
  Object.freeze(SubClass.prototype)
  return SubClass
}

var Square = extendClass3(Rectangle, function (width) {
  Rectangle.call(this, width, width)
})
var square = new Square(3)

console.log(square.getArea())
