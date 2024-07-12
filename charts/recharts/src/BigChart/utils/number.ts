type NestedNumberArray = number | NestedNumberArray[]

export function getFloor(num: NestedNumberArray): NestedNumberArray {
  if (typeof num === 'number') {
    return Math.floor(num)
  } else if (Array.isArray(num)) {
    return num.map(getFloor)
  } else {
    throw new Error('Input must be a number or an array of numbers.')
  }
}

export function getMax(arr: number[]) {
  return arr.reduce((max, v) => (max >= v ? max : v), -Infinity)
}

export function getMin(arr: number[]) {
  return arr.reduce((min, v) => (min >= v ? v : min), Infinity)
}
