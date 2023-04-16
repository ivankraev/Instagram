import { CreateWorker } from './createWorker'

type TranferMessage = {
  filter: FilterObject
  imageData: Pick<ImageData, 'data' | 'width' | 'height'>
}

export const applyFilter = (worker: CreateWorker, image: ImageData, filter: FilterObject) => {
  if (!image) return

  const clonedImageData = {
    data: new Uint8ClampedArray(image.data),
    width: image.width,
    height: image.height,
  }

  worker.postMessage<TranferMessage>({ filter, imageData: clonedImageData }, [
    clonedImageData.data.buffer,
  ])
}
