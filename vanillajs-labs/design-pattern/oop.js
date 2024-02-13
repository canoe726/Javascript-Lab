function A() {
  this.a = 'A'
  this.b = 'B'

  this.getB = function () {
    return this.b
  }
}

// 메모리 효율 증가
A.prototype.getA = () => {
  return this.a
}

const a = new A()

console.log(typeof A)
console.log(A instanceof Object)
console.log(A.prototype.constructor === A)
console.log(a.__proto__ === A.prototype)

// 상속
const objA = Object.create(A.prototype)
console.log(objA.__proto__ === A.prototype)

function TV(brand, model, price) {
  this.brand = brand
  this.model = model
  this.price = price
}

TV.prototype.turnOn = function () {
  console.log(`[${this.brand}] (${this.model}) TV turn on`)
}

TV.prototype.turnOff = function () {
  console.log(`[${this.brand}] (${this.model}) TV turn off`)
}

TV.prototype.getPrice = function () {
  return this.price
}

console.log(new TV('Samsung', 'S-001', '10000').getPrice())

function LgTv(model, price) {
  this.brand = 'LG'
  TV.apply(this, [this.brand, model, price])
}

LgTv.prototype = Object.create(TV.prototype)
LgTv.prototype.constructor = LgTv

console.log(new LgTv('L-001', '20000').getPrice())

// 오버로딩
function fn1() {
  if (arguments.length === 1) {
    console.log(arguments[0])
  }
  if (arguments.length === 2) {
    console.log(arguments[0], arguments[1])
  }
}

fn1(1)
fn1(1, 2)

// 인터페이스
function Interface() {
  this.implements = function (obj) {
    const notImplementedMethod = []

    for (const method in this) {
      if (method !== 'implements') {
        if (!Object.hasOwnProperty.call(obj.__proto__, method)) {
          notImplementedMethod.push(method)
        }
      }
    }

    if (notImplementedMethod.length > 0) {
      throw new Error(`${obj.__proto__.constructor.name} 이 구현되지 않았습니다.`)
    }
  }
}

function ITV() {
  if (this.constructor === ITV) {
    throw new Error(`${this.constructor.name} 인터페이스는 객체를 생성할 수 없습니다.`)
  }

  return (function () {
    const method = {
      turnOn: function () {},
      turnOff: function () {},
    }

    Interface.call(method)
    return method
  })()
}

function SamsungTv(model, price) {
  ITV().implements(this)
  this.brand = 'Samsung'
  this.model = model
  this.price = price
}
SamsungTv.prototype.turnOn = function () {
  console.log(`${this.brand} TV turn on`)
}
SamsungTv.prototype.turnOff = function () {
  console.log(`${this.brand} TV turn off`)
}

const samsungTv = new SamsungTv('S-002', 20000)

// console.log(new ITV())
