const numbers = new Proxy([], {
  set: (target, prop, value, receiver) => {
    if (!Number.isNaN(Number(prop))) {
      if (typeof value !== 'number') {
        throw new TypeError('Invalid value')
      }
    }
    return Reflect.set(target, prop, value, receiver)
  },
})

numbers.push(1)
numbers[1] = 2
console.log(numbers)

const observable = (target, onChange) => {
  return new Proxy(target, {
    set: (target, prop, value, receiver) => {
      const oldValue = target[prop]
      const newValue = Reflect.set(target, prop, value, receiver)
      if (newValue && oldValue !== value) {
        onChange(prop, value, oldValue)
      }
      return newValue
    },
  })
}

const state = observable(
  {
    a: 10,
    b: 20,
  },
  (key, next, prev) => {
    console.log(`[changed] ${key}: ${prev} -> ${next}`)
  },
)
state.a = 100
state.b = 200

const perfTime = (fn) => {
  return new Proxy(fn, {
    apply: (target, thisArg, args) => {
      const startTime = globalThis.performance.now()

      try {
        return Reflect.apply(target, thisArg, args)
      } finally {
        const endTime = globalThis.performance.now()
        return { result: target(...args), duration: endTime - startTime }
      }
    },
  })
}

const timeFn = perfTime(() => {
  let a = 0
  for (let i = 0; i < 1000000000; i++) {
    a += 1
  }
  return a
})
console.log(timeFn())

const timeFn2 = perfTime(async () => {
  return await new Promise((resolve) => {
    let a = 0
    for (let i = 0; i < 1000000000; i++) {
      a += 1
    }
    resolve(a)
  })
})
console.log(timeFn2())
