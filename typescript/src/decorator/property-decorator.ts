/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 1                                */
/* -------------------------------------------------------------------------- */
function writable(writable: boolean) {
  return function (target: any, decoratedPropertyName: any): any {
    return {
      writable,
    }
  }
}

class PropertyDecorator1 {
  @writable(false)
  public data1 = 0

  @writable(true)
  public data2 = 0
}

// const test1 = new PropertyDecorator1()
// test1.data1 = 1000
// test1.data2 = 1000

/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 2                                */
/* -------------------------------------------------------------------------- */
function SetDefaultValue(numberA: number, numberB: number) {
  return (target: any, propertyKey: string) => {
    const initNum = numberA * numberB
    let value = 0

    Object.defineProperty(target, propertyKey, {
      get() {
        return value + initNum
      },
      set(newValue: number) {
        value = newValue - 30
      },
    })
  }
}

class PropertyDecorator2 {
  @SetDefaultValue(10, 20)
  num: number = 0
}

// const test2 = new PropertyDecorator2()
// test2.num = 30
// console.log('result1 : ', test2.num)

// test2.num = 130
// console.log('result2 : ', test2.num)
