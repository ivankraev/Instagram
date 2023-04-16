interface ICreateWorker {
  init<MType>(newWorker: Worker, fn: (event: MessageEvent<MType>) => void): void
  isInitialized(): boolean
  destroy(): void
  postMessage<MType>(message: MType, transfer?: Transferable[]): void
}

export class CreateWorker implements ICreateWorker {
  private worker?: Worker

  init<MType>(newWorker: Worker, fn: (event: MessageEvent<MType>) => void) {
    if (this.worker) {
      this.destroy()
    }
    console.log('initializing worker...')

    // there is a bug in Worker class that doesn't allow to create a new Worker
    // based on dynamic URL and this.worker needs to be initialized with already
    // instantiated Worker - see more https://github.com/vercel/next.js/issues/31009
    this.worker = newWorker
    this.worker.onmessage = fn
  }

  isInitialized() {
    return Boolean(this.worker)
  }

  destroy() {
    if (this.worker) {
      console.log('terminating worker...')

      this.worker.terminate()
      this.worker = undefined
    }
  }

  postMessage<MType>(message: MType, transfer?: Transferable[]): void {
    /*     if (!this.worker) {
      throw new Error('Worker is not initialized')
    } */
    if (transfer) {
      this.worker?.postMessage(message, transfer)
    } else {
      this.worker?.postMessage(message)
    }
  }
}
