export class IndexedDB {
  private db: IDBDatabase | null
  private readonly dbName: string
  private readonly storeName: string

  constructor(dbName: string, storeName: string) {
    this.db = null
    this.dbName = dbName
    this.storeName = storeName
    this.init()
  }

  private init() {
    const request = indexedDB.open(this.dbName)
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true })
    }

    request.onsuccess = () => {
      this.db = request.result as IDBDatabase
    }

    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB', event)
    }
  }

  public add(data: unknown): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB is not initialized.'))
        return
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)
      const request = objectStore.add(data)

      request.onsuccess = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resolve(request.result)
      }

      request.onerror = (event: Event) => {
        console.error('Error adding data to IndexedDB', event)
        reject(new Error('Failed to add data to IndexedDB.'))
      }
    })
  }

  public getAll(): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('IndexedDB is not initialized.'))
        return
      }

      const transaction = this.db.transaction(this.storeName, 'readonly')
      const objectStore = transaction.objectStore(this.storeName)
      const request = objectStore.getAll()

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = (event: Event) => {
        console.error('Error retrieving data from IndexedDB', event)
        reject(new Error('Failed to retrieve data from IndexedDB.'))
      }
    })
  }
}
