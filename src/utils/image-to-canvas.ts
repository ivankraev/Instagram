export const imageToCanvas = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  maxWidth: number,
) => {
  const ratio = maxWidth / image.width

  canvas.width = maxWidth
  canvas.height = image.height * ratio

  const context = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D

  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  return context.getImageData(0, 0, canvas.width, canvas.height)
}
