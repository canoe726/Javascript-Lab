function Flyweight(make, model, processor) {
  this.make = make
  this.model = model
  this.processor = processor
}

const FlyWeightFactory = (function () {
  const flyweights = {}

  return {
    self: function () {
      return flyweights
    },
    get: function (make, model, processor) {
      if (!flyweights[make + model]) {
        flyweights[make + model] = new Flyweight(make, model, processor)
      }
      return flyweights[make + model]
    },
    getCount: function () {
      let count = 0
      for (const f in flyweights) {
        count += 1
      }
      return count
    },
  }
})()

function ComputerCollections() {
  const computers = {}
  let count = 0

  return {
    self: function () {
      return computers
    },
    add: function (make, model, processor, memory, tag) {
      computers[tag] = new Computer(make, model, processor, memory, tag)
      count += 1
    },
    get: function (tag) {
      return computers[tag]
    },
    getCount: function () {
      return count
    },
  }
}

const Computer = function (make, model, processor, memory, tag) {
  this.flyweight = FlyWeightFactory.get(make, model, processor)
  this.memory = memory
  this.tag = tag
  this.getMake = function () {
    return this.flyweight.make
  }
  this.getModel = function () {
    return this.flyweight.model
  }
  this.getProcessor = function () {
    return this.flyweight.processor
  }
}

function run() {
  const computers = new ComputerCollections()

  computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P')
  computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P')
  computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P')

  computers.add('Dell', 'Studio XPS', 'Intel', '6G', 'X997T')
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'U8U80')
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', '0J88A')
  computers.add('HP', 'Envy', 'Intel', '4G', 'CNU883701')
  computers.add('HP', 'Envy', 'Intel', '2G', 'TXU003283')

  console.log('Computers : ', computers.self(), computers.getCount())
  console.log('Flyweights : ', FlyWeightFactory.self(), FlyWeightFactory.getCount())
  console.log('Y755P : ', computers.get('Y755P'))
}

run()
