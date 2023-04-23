const fs = require('fs')

const { mergeSort } = require('../../utils/mergeSort')

const FILE_NAME = '1.2.check-permutation-relation'
const ANSWER_FILE_NAME = `./${FILE_NAME}.answer`
const TEST_FILE_NAME = `./${FILE_NAME}.test`

function checkStringPermutationRelation2(case1, case2) {
  if (case1.length !== case2.length) {
    return 'false'
  } else {
    const length = case1.length

    const stringList1 = mergeSort(case1.split(''))
    const stringList2 = mergeSort(case2.split(''))
    let isSame = true

    for (let index = 0; index < length; index++) {
      if (stringList1[index] !== stringList2[index]) {
        isSame = false
      }
    }

    return `${isSame}`
  }
}

function checkStringPermutationRelation1(case1, case2) {
  if (case1.length !== case2.length) {
    return 'false'
  } else {
    const length = case1.length
    const stringList1 = case1.split('').sort()
    const stringList2 = case2.split('').sort()
    let isSame = true

    for (let index = 0; index < length; index++) {
      if (stringList1[index] !== stringList2[index]) {
        isSame = false
      }
    }

    return `${isSame}`
  }
}

function main(input) {
  const answer = []
  const testCaseList = input.split('\n')

  for (let index = 0; index < testCaseList.length; index++) {
    const [case1, case2] = testCaseList[index].split(' ')
    const result = checkStringPermutationRelation2(case1, case2)

    answer.push(result)
  }

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