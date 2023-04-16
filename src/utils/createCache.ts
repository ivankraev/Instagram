interface ICreateCache<K, V> {
  get(key: K): V | undefined
  set(key: K, value: V): void
  invalidate(key: K): void
  reset(): void
}

export class CreateCache<K, V> implements ICreateCache<K, V> {
  private cache

  constructor() {
    this.cache = new Map<K, V>()
  }

  get(key: K) {
    return this.cache.get(key)
  }

  set(key: K, value: V) {
    this.cache.set(key, value)
  }

  invalidate(key: K) {
    this.cache.delete(key)
  }

  reset() {
    console.log('clearing cache...')
    this.cache.clear()
  }
}
