function Constructor(name) {
  this.name = name
}
Constructor.prototype.method1 = function () {}
Constructor.prototype.property1 = 'Constructor Prototype'

var instance = new Constructor('Instance')
console.dir(instance.__proto__)
console.dir(Constructor)
console.dir(instance)

var Person = function (name) {
  this._name = name
}

Person.prototype.getName = function () {
  // console.log(this)
  return this._name
}

var suzi = new Person('suzi')
console.log(suzi.__proto__.getName())
console.log(suzi.__proto__.getName.call(suzi))
console.log(Object.getPrototypeOf(suzi).getName())
console.log(Person.prototype === suzi.__proto__)
console.log(suzi.getName())
