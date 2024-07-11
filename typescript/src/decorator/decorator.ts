/* -------------------------------------------------------------------------- */
/*                                   TEST 1                                   */
/* -------------------------------------------------------------------------- */
function readonly(writable: boolean) {
  return function (target: any, decoratedPropertyName: any): any {
    return {
      writable: !writable,
    }
  }
}

class Test1 {
  property = 'property'

  @readonly(false)
  public data1 = 0

  @readonly(true)
  public data2 = 0
}

// const t = new Test1()
// t.data1 = 1000
// t.data2 = 1000 // can not edit

/* -------------------------------------------------------------------------- */
/*                                   TEST 2                                   */
/* -------------------------------------------------------------------------- */
function Component(value: string) {
  return function (target: Function) {
    console.log('value: ', value)
    console.log('target: ', target)
  }
}

@Component('hello world')
class Test2 {}

// const tabs = new Test2()
