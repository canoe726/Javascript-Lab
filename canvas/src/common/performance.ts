export function measurePerformance(callback: Function) {
  performance.mark('start')

  callback()

  performance.mark('end')
  performance.measure('My first measure', 'start', 'end')

  return performance.getEntriesByName('My first measure')[0]
}
