exports.epicFail = (req, res) => {
  process.nextTick(() => {
    throw new Error('Nope!')
  })
}
