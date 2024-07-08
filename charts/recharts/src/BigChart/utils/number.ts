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
