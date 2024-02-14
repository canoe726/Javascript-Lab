const Singleton = (function () {
  let instance

  function createInstance() {
    return new Object('Single Instance')
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

function run() {
  const instance1 = Singleton.getInstance()
  const instance2 = Singleton.getInstance()

  console.log(instance1 === instance2)
}

run()
