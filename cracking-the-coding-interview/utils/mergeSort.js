function merge(left, right) {
  const sorted = []
  
  while (left.length && right.length) {
    if (left[0] < right) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift())
    }
  }

  return [...sorted, ...left, ...right]
}

function mergeSort(list) {
  if (list.length === 1) {
    return list
  }

  const mid = Math.floor(list.length / 2)
  const left = list.slice(0, mid)
  const right = list.slice(mid)
  
  return merge(mergeSort(left), mergeSort(right))
}

module.exports = { mergeSort }