const name = {
  firstName: 'Gildong',
  lastName: 'Hong',
  getName: function () {
    return this.firstName + ' ' + this.lastName
  },
}

console.log('--- bind variable ---')
console.log(name.getName())

const getName = name.getName
console.log(getName())
console.log(getName.bind(name)())

function Name(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
  this.getName = function () {
    return this.firstName + ' ' + this.lastName
  }
  this.getThis = function () {
    return this
  }
}

Name('Gildong', 'Hong')

console.log('--- global this ---')
console.log(global.firstName)
console.log(getName())
console.log(getThis())
