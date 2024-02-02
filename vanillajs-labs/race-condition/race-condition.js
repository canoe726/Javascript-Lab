let balance = 0

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
  const balance = await loadBalance()
  console.log(`sellGrapes - balance loaded : ${balance}`)
  const newBalance = balance + 50
  await saveBalance(newBalance)
  console.log(`sellGrapes - balance updated : ${newBalance}`)
}

async function sellOlives() {
  const balance = await loadBalance()
  console.log(`sellOlives - balance loaded : ${balance}`)
  const newBalance = balance + 50
  await saveBalance(newBalance)
  console.log(`sellOlives - balance updated : ${newBalance}`)
}

async function main() {
  const transaction1 = sellGrapes()
  const transaction2 = sellOlives()

  //   await transaction1
  //   await transaction2
  await Promise.all([transaction1, transaction2])

  const balance = await loadBalance()
  console.log(`Final balance : ${balance}`)
}

main()
