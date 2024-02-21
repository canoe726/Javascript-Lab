function Employee(name) {
  this.name = name

  this.say = function () {
    console.log(`I am employee : ${name}`)
  }
}

function EmployeeFactory() {
  this.create = function (name) {
    return new Employee(name)
  }
}

function Vendor(name) {
  this.name = name

  this.say = function () {
    console.log(`I am vendor : ${name}`)
  }
}

function VendorFactory() {
  this.create = function (name) {
    return new Vendor(name)
  }
}

function run() {
  const persons = []
  const employeeFactory = new EmployeeFactory()
  const vendorFactory = new VendorFactory()

  persons.push(employeeFactory.create('John'))
  persons.push(employeeFactory.create('Tim'))
  persons.push(vendorFactory.create('Waston'))
  persons.push(vendorFactory.create('Nicole'))

  for (let i = 0; i < persons.length; i++) {
    persons[i].say()
  }
}

run()
