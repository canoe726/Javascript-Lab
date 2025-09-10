const target = {
  name: 'My name is John',
}

const name = Reflect.get(target, 'name')
console.log(name)
