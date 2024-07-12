export function getRandomRgbColor() {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // Return the RGB color string
  return `rgb(${r}, ${g}, ${b})`
}
