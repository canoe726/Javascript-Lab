const FullTime = function () {
  this.hourly = '$12'
}

const PartTime = function () {
  this.hourly = '$11'
}

const Temporary = function () {
  this.hourly = '$10'
}

const Contractor = function () {
  this.hourly = '$15'
}

const Factory = function () {
  this.createEmployee = function (type) {
    let employee = undefined

    if (type === 'fulltime') {
      employee = new FullTime()
    }
    if (type === 'parttime') {
      employee = new PartTime()
    }
    if (type === 'temporary') {
      employee = new Temporary()
    }
    if (type === 'contractor') {
      employee = new Contractor()
    }
    employee.type = type
    employee.say = function () {
      console.log(`${this.type} : rate, ${this.hourly} hour`)
    }

    return employee
  }
}

function run() {
  const employees = []
  const factory = new Factory()
  employees.push(factory.createEmployee('fulltime'))
  employees.push(factory.createEmployee('parttime'))
  employees.push(factory.createEmployee('temporary'))
  employees.push(factory.createEmployee('contractor'))

  employees.forEach((employee) => {
    employee.say()
  })
}

run()
