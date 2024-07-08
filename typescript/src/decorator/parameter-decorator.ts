/* -------------------------------------------------------------------------- */
/*                                 TEST CASE 1                                */
/* -------------------------------------------------------------------------- */
function MinLength(min: number) {
  console.log('min: ', min)

  return function (target: any, methodName: string, paramIndex: number) {
    console.log('parameterDecorator1 start')
    console.log(target)
    console.log(methodName)
    console.log(paramIndex)
    console.log('parameterDecorator1 end')
  }
}

class ParameterDecorator1 {
  private _name: string
  private _age?: string

  constructor(name: string) {
    this._name = name
  }

  setAge(@MinLength(3) age: string) {
    this._age = age
  }
}

// const test1 = new ParameterDecorator1('hello')
// test1.setAge('5')
