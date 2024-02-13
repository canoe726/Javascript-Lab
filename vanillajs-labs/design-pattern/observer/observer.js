function Click() {
  this.handlers = []
}

Click.prototype = {
  subscribe: function (fn) {
    this.handlers.push(fn)
  },
  unsubscribe: function (fn) {
    this.handlers = this.handlers.filter(function (item) {
      if (item !== fn) {
        return item
      }
    })
  },
  fire: function (o, thisObj) {
    const scope = thisObj
    this.handlers.forEach(function (item) {
      item.call(scope, o)
    })
  },
}

function run() {
  const clickHandler = function (item) {
    console.log('fired: ', item)
  }

  const click = new Click()

  click.subscribe(clickHandler)
  click.fire('event #1')
  click.unsubscribe(clickHandler)
  click.fire('event #2')
  click.subscribe(clickHandler)
  click.fire('event #3')
}

run()
