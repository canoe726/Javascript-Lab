export function getFontMeasure(metrics: TextMetrics) {
  const fontWidth = metrics.width
  const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent

  return {
    fontWidth,
    fontHeight,
  }
}
