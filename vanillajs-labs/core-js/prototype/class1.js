var Rectangle = function (width, height) {
  this.width = width
  this.height = height
}
// prototype method
Rectangle.prototype.getArea = function () {
  return this.width * this.height
}
// static method
Rectangle.isRectangle = function (instance) {
  return instance instanceof Rectangle && instance.width > 0 && instance.height > 0
}

var extendClass1 = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = new SuperClass()
  for (var prop in SubClass.prototype) {
    if (SubClass.prototype.hasOwnProperty(prop)) {
      delete SubClass.prototype[prop]
    }
  }
  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method]
    }
  }
  Object.freeze(SubClass)
  return SubClass
}

// var Square = function (width) {
//   Rectangle.call(this, width, width)
// }
// Square.prototype = new Rectangle()
var Square = extendClass1(Rectangle, function (width) {
  Rectangle.call(this, width, width)
})

var rect1 = new Rectangle(3, 4)
console.log(rect1.getArea())
console.log(Rectangle.isRectangle(rect1))
console.dir(Rectangle)
// console.log(rect1.isRectangle(rect1))

var square = new Square(4)
console.log(square.getArea())
