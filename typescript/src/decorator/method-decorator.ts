/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 1                                */
/* -------------------------------------------------------------------------- */
function methodDecorator1() {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any) {
      let startTime = new Date().getTime()

      originalMethod.apply(this, args)

      let endTime = new Date().getTime()
      console.log('time diff : ', `${(endTime - startTime) / 1000}s`)
    }
  }
}

class MethodDescriptor1 {
  data1 = 'value1'
  data2 = 'value2'

  @methodDecorator1()
  print() {
    let a = 0
    for (let i = 0; i < 100000000; i++) {
      a += 1
    }
    console.log('hello world')
  }
}

// const test1 = new MethodDescriptor1()
// test1.print()
