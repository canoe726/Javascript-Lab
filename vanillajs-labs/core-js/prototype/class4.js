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

var extendClass = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = Object.create(SuperClass.prototype)
  SubClass.prototype.constructor = SubClass
  SubClass.prototype.super = function (propName) {
    var self = this
    if (!propName)
      return function () {
        SuperClass.apply(self, arguments)
      }
    var prop = SuperClass.prototype[propName]
    if (typeof prop !== 'function') return prop
    return function () {
      return prop.apply(self, arguments)
    }
  }

  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method]
    }
  }
  Object.freeze(SubClass.prototype)
  return SubClass
}

var Square = extendClass(
  Rectangle,
  function (width) {
    this.super()(width, width)
  },
  {
    getArea: function () {
      console.log('size is : ', this.super('getArea')())
    },
  },
)
var square = new Square(3)
square.getArea()
console.log(square.super('getArea')())
