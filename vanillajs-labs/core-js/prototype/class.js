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

var rect1 = new Rectangle(3, 4)
console.log(rect1.getArea())
console.log(Rectangle.isRectangle(rect1))
console.dir(Rectangle)
// console.log(rect1.isRectangle(rect1))
