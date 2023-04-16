export const processImage = (eventData: FilterMessage) => {
  const { filter, imageData } = eventData
  const { data, width, height } = imageData

  const filteredData = new Uint8ClampedArray(data.length)
  console.log('processing image...')

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    switch (filter) {
      case 'grayscale': {
        const gray = 0.2989 * r + 0.587 * g + 0.114 * b
        filteredData[i] = gray
        filteredData[i + 1] = gray
        filteredData[i + 2] = gray
        filteredData[i + 3] = a
        break
      }
      case 'sepia': {
        const sepiaR = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
        const sepiaG = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
        const sepiaB = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
        filteredData[i] = sepiaR
        filteredData[i + 1] = sepiaG
        filteredData[i + 2] = sepiaB
        filteredData[i + 3] = a
        break
      }
      default: {
        filteredData[i] = r
        filteredData[i + 1] = g
        filteredData[i + 2] = b
        filteredData[i + 3] = a
        break
      }
    }
  }

  return { filter, imageData: new ImageData(filteredData, width, height) }
}
