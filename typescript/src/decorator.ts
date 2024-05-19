// @errors: 2339
// @experimentalDecorators
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = 'http://www...'
  }
}

@reportableClassDecorator
class BugReport {
  type = 'report'
  title: string

  constructor(t: string) {
    this.title = t
  }
}

const bug = new BugReport('Needs dark mode')
console.log(bug.title) // Prints "Needs dark mode"
console.log(bug.type) // Prints "report"
