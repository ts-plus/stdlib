/**
 * @tsplus type MutableHashSet
 * @tsplus companion MutableHashSet/Ops
 */
export class MutableHashSet<A> implements Collection<A> {
  private backingMap: MutableHashMap<A, boolean>

  constructor() {
    this.backingMap = MutableHashMap.empty()
  }

  get size(): number {
    return this.backingMap.size
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  contains(value: A): boolean {
    return this.backingMap.has(value)
  }

  add(value: A): boolean {
    this.backingMap.set(value, true)
    return this.backingMap.has(value)
  }

  remove(value: A): boolean {
    this.backingMap.remove(value)

    return !this.backingMap.has(value)
  }

  [Symbol.iterator](): Iterator<A> {
    return this.backingMap.map(({ tuple: [a] }) => a)[Symbol.iterator]()
  }
}
