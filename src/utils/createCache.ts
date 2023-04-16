interface ICreateCache<K, V> {
  get(key: K): V | undefined
  set(key: K, value: V): void
  invalidate(key: K): void
  reset(): void
}

export class CreateCache<K extends object, V> implements ICreateCache<K, V> {
  private cache

  constructor() {
    this.cache = new WeakMap<K, V>()
  }

  get(key: K) {
    const value = this.cache.get(key)
    if (value) {
      console.log('retrieving image data from cache...')
    }
    return value
  }

  set(key: K, value: V) {
    this.cache.set(key, value)
  }

  invalidate(key: K) {
    this.cache.delete(key)
  }

  reset() {
    console.log('clearing cache...')
    this.cache = new WeakMap<K, V>()
  }
}
