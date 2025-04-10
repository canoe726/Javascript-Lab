const fs = require('fs')

const origin = 'ABABABABAB' // fs.readFileSync('./origin.json', { encoding: 'utf-8', flag: 'r' })

function lz77Compress(input) {
  let windowSize = 255
  let i = 0
  let compressed = [] // [[distance, length, nextChar], ...]

  while (i < input.length) {
    let matchDistance = 0
    let matchLength = 0
    let j = 0

    for (j = Math.max(0, i - windowSize); j < i; j++) {
      let k = 0
      while (i + k < input.length && input[j + k] === input[i + k]) {
        k++
        matchDistance = i - j
        matchLength = k
      }
    }

    if (matchDistance > 0) {
      compressed.push([matchDistance, matchLength, input[i + matchLength] || ''])
      i += matchLength + 1
    } else {
      compressed.push([0, 0, input[i]])
      i++
    }
  }

  return compressed
}

function lz77Decompress(compressed) {}

const lz77Compressed = lz77Compress(origin)
console.log('lz77Compressed: ', lz77Compressed)

const originData = lz77Decompress(lz77Compressed)
console.log('originData: ', originData)
