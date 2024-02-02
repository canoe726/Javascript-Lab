export const componentToHex = (value: number) => {
  const hex = value.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export const getRandomHexColors = (num: number) => {
  const hexColors = []
  for (let i = 0; i < num; i++) {
    const hexColor = rgbToHex(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    )
    hexColors.push(hexColor)
  }
  return hexColors
}
