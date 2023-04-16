export const urlFromCanvas = (image: ImageData, canvas: HTMLCanvasElement) => {
  canvas.width = image.width
  canvas.height = image.height

  const context = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D

  context.putImageData(image, 0, 0)

  return canvas.toDataURL('image/jpeg', 0.85)
}
