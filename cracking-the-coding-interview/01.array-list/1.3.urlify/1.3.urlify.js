const fs = require('fs')

const FILE_NAME = '1.3.urlify'
const ANSWER_FILE_NAME = `./${FILE_NAME}.answer`
const TEST_FILE_NAME = `./${FILE_NAME}.test`

function main(input) {
  const answer = []

  console.log('input : ', input)

  return answer
}

function input() {
  const answer = fs.readFileSync(ANSWER_FILE_NAME, { encoding: 'utf-8', flag: 'r' }).split('\n')
  const test = fs.readFileSync(TEST_FILE_NAME, { encoding: 'utf-8', flag: 'r' })
  const response = main(test)

  if (answer === null || response === null || answer.length !== response.length) {
    console.error('Failed to start main function')
    return;
  }

  let isSame = true
  answer.map((answerItem, index) => {
    if (answerItem !== response[index]) {
      isSame = false
    }
  })

  if (isSame) {
    console.log(`Pass [${FILE_NAME}]`)
  } else {
    console.log(`Fail [${FILE_NAME}]`)
  }
}

input()