// const { Mutex } = require('async-mutex')

let balance = 0
// const mutex = new Mutex()
let mutex = Promise.resolve()

const randomDelay = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 100))

async function loadBalance() {
  await randomDelay()
  return balance
}

async function saveBalance(value) {
  await randomDelay()
  balance = value
}

async function sellGrapes() {
  // const release = await mutex.acquire()
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance()
      console.log(`sellGrapes - balance loaded : ${balance}`)
      const newBalance = balance + 50
      await saveBalance(newBalance)
      console.log(`sellGrapes - balance updated : ${newBalance}`)
    })
    .catch(() => {})
  return mutex
}

async function sellOlives() {
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance()
      console.log(`sellOlives - balance loaded : ${balance}`)
      const newBalance = balance + 50
      await saveBalance(newBalance)
      console.log(`sellOlives - balance updated : ${newBalance}`)
    })
    .catch(() => {})
  return mutex
}

async function main() {
  await Promise.all([
    sellGrapes(),
    sellOlives(),
    sellGrapes(),
    sellOlives(),
    sellGrapes(),
    sellOlives(),
    sellGrapes(),
  ])

  const balance = await loadBalance()
  console.log(`Final balance : ${balance}`)
}

main()
