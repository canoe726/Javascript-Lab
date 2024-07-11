export function generateRandomData(size = 1000, range = 100) {
  const length = size
  const randData = Array.from({ length }, (_, index) => {
    const name = `Page [${index}]`
    const uv = Math.floor(Math.random() * range)
    const pv = Math.floor(Math.random() * range)

    return { name, uv, pv }
  })

  return randData
}
