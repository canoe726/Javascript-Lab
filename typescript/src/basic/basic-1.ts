let a: object = {
  b: 'x',
}

console.log(a.b) // error

class Person {
  // this.firstName = firstName
  constructor(public firstName: string, public lastName: string) {}
}

let i: number // definite assignment
let j = i * 3 // force to assignment

let test: {
  readonly b: number
  c?: string
  // index signature
  [key: number]: boolean
} = {
  b: 1,
  c: 'x',
  0: true,
}

// object != Object
let obj: Object = {
  toString() {},
}

type Age = number

if (true) {
  // type shadowing <- 블록 영역을 가지므로 덮어씀
  type Age = string
  let b: Age = 'x'
}

type Cat = { name: string; purrs: boolean }
type Dog = { name: string; barks: boolean; wags: boolean }
type CatOrDogBoth = Cat | Dog
type CatAndDog = Cat & Dog

const both: CatAndDog = {
  purrs: true,
  barks: true,
  wags: true,
  name: 'x',
}

const func = function (a: string, b: number) {
  return a || b
}
