var ES6 = class {
  constructor(name) {
    this.name = name
  }
  static staticMethod() {
    return this.name + ' staticMethod'
  }
  method() {
    return this.name + ' method'
  }
}

var es6Instance = new ES6('es6')
console.log(ES6.staticMethod())
console.log(es6Instance.method())

var Rectangle = class {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
  getArea() {
    return this.width * this.height
  }
}
var Square = class extends Rectangle {
  constructor(width) {
    super(width, width)
  }
  getArea() {
    console.log('getArea : ', this.width * this.width)
  }
}

var square = new Square(3)
square.getArea()
