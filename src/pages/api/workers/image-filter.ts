import { processImage } from 'utils/process-image'

addEventListener('message', (event: MessageEvent<FilterMessage>) => {
  const { filter, imageData } = processImage(event.data)

  ;(postMessage as Worker['postMessage'])({ filter, imageData }, [imageData.data.buffer])
})
