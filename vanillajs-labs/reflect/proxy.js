let target = {
  name: 'My name is John',
}

let handler = {
  get: (target, prop) => {
    return target[prop]
  },
  set: (target, prop, value) => {
    // target[prop] = value

    const originName = target['name']
    const names = originName.split(' ')
    names[names.length - 1] = value
    target['name'] = names.join(' ')

    return true
  },
  has: (target, prop) => {
    return prop in target
  },
}

const proxy = new Proxy(target, handler)
proxy.name = 'YoungKim'

console.log(target, proxy.name)

// 메모리 해제
const { proxy: revocableProxy, revoke } = Proxy.revocable(target, handler)
try {
  revoke()
  revocableProxy.name = 'hello'
} catch (error) {
  console.log('error : ', error)
}
