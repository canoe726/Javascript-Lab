/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 1                                */
/* -------------------------------------------------------------------------- */
function classDecorator1<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    data1 = 'value1'
    data2 = 'value2'
  }
}

@classDecorator1
class ClassDecoratorClass1 {
  data1: string

  constructor(data1: string) {
    this.data1 = data1
  }
}

// const test1 = new ClassDecoratorClass1('test-value1')
// console.log(test1)
// console.log(test1.data1)

/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 2                                */
/* -------------------------------------------------------------------------- */
function classDecorator2(param1: string, param2: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      data1 = param1
      data2 = param2
    }
  }
}

@classDecorator2('test-value1', 'test-value2')
class ClassDecoratorClass2 {
  data1: string

  constructor(data1: string) {
    this.data1 = data1
  }
}

// const test2 = new ClassDecoratorClass2('test-value1')
// console.log(test2)
// console.log(test2.data1)

/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 3                                */
/* -------------------------------------------------------------------------- */
function classDecorator3<T extends { new (...args: any[]): {} }>(constructorFn: T) {
  constructorFn.prototype.print = function () {
    console.log('hello world')
  }
  constructorFn.prototype.testData = 'test-data'

  return class extends constructorFn {
    public name = 'hello world'

    constructor(...args: any[]) {
      super(args)
    }
  }
}

@classDecorator3
class ClassDecoratorClass3 {}

// const test3 = new ClassDecoratorClass3()
// console.log(test3)
