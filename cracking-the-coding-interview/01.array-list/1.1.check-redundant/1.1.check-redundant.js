const FILE_NAME = './1.1.check-redundant.test'

const fs = require('fs')
fs.readFile(FILE_NAME, 'utf-8', (error, data) => {
  if (error) {
    console.error(`Failed to read file : ${FILE_NAME}`)
  } else {
    main(data)
  }
})

function _split (input, delimeter) {
  const result = []

  let temp = ''
  for (let index = 0; index < input.length; index++) {
    if (input[index] !== delimeter) {
      temp += input[index]
    } else {
      result.push(temp)
      temp = ''
    }
  }
  result.push(temp)

  return result
}

function isContainDuplicateCharactersWithoutDataStructure1(str) {
  // Time: O(N^2), Space: O(N)
  for (let index = 0; index < str.length - 1; index++) {
    for (let wordIndex = index + 1; wordIndex < str.length; wordIndex++) {
      if (str[index] == str[wordIndex]) {
        return true
      }
    }
  }

  return false
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
function isContainDuplicateCharactersWithoutDataStructure2(str) {
  // Time: O(N), Space: O(65536)
  let checkArray = []

  for (let index = 0; index < str.length; index++) {
    const indexOfCharCode = str.charCodeAt(index)

    if (checkArray[indexOfCharCode]) {
      checkArray = null
      return true
    } else {
      checkArray[indexOfCharCode] = true
    }
  }

  checkArray = null
  return false
}

// https://stackoverflow.com/questions/57763205/what-is-array-prototype-sort-time-complexity
function isContainDuplicateCharactersWithoutDataStructure3(str) {
  // Time: O(N * log(N))
  let tempSortList = []

  for (let index = 0; index < str.length; index++) {
    tempSortList.push(str[index])
  }
  tempSortList.sort()

  for (let index = 0; index < str.length - 1; index++) {
    let current = index;
    let next = current + 1

    if (tempSortList[current] == tempSortList[next]) {
      return true
    }
  }

  tempSortList = null
  return false
}

function isContainDuplicateCharactersWithDataStructure1(str) {
  const uniqueData = new Set(str)

  if (str.length == uniqueData.size) {
    return false
  } else {
    return true
  }
}

// https://stackoverflow.com/questions/39543781/regex-test-in-javascript-if-a-string-contains-only-unique-characters
function isContainDuplicateCharactersWithRegex(str) {
  // Only check alphabet, 0-9
  const checkStringUniqueRegex = new RegExp(/([a-zA-Z0-9]).*?\1/g)

  if (checkStringUniqueRegex.test(str)) {
    return true
  } else {
    return false
  }
}

function main(input) {
  const testCaseStringList = _split(input, '\n')
  
  for (let index = 0; index < testCaseStringList.length; index++) {
    const testCase = testCaseStringList[index]

    // console.log(`[${index + 1}] : ${isContainDuplicateCharactersWithoutDataStructure1(testCase)}`)
    // console.log(`[${index + 1}] : ${isContainDuplicateCharactersWithoutDataStructure2(testCase)}`)
    // console.log(`[${index + 1}] : ${isContainDuplicateCharactersWithoutDataStructure3(testCase)}`)
    // console.log(`[${index + 1}] : ${isContainDuplicateCharactersWithDataStructure1(testCase)}`)
    console.log(`[${index + 1}] : ${isContainDuplicateCharactersWithRegex(testCase)}`)
  }
}
