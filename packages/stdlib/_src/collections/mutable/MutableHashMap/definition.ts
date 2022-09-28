export const MutableHashMapSym = Symbol.for("@tsplus/stdlib/collections/mutable/MutableHashMap")
export type MutableHashMapSym = typeof MutableHashMapSym

export const _K = Symbol.for("@tsplus/stdlib/collections/mutable/MutableHashMap/K")
export type _K = typeof _K

export const _V = Symbol.for("@tsplus/stdlib/collections/mutable/MutableHashMap/V")
export type _V = typeof _V

/**
 * A mutable `HashMap`.
 *
 * @tsplus type MutableHashMap
 * @tsplus companion MutableHashMap.Ops
 */
export class MutableHashMap<K, V> implements Collection<readonly [K, V]>, Equals {
  readonly [MutableHashMapSym]: MutableHashMapSym = MutableHashMapSym
  readonly [_K]!: () => K
  readonly [_V]!: () => V

  private backingMap = new Map<number, Node<K, V>>()
  private length = new AtomicNumber(0)

  get size(): number {
    return this.length.get
  }

  [Hash.sym]() {
    return Hash.randomCached(this)
  }

  [Equals.sym](that: unknown) {
    return this === that
  }

  get(k: K): Maybe<V> {
    const hash = Hash.unknown(k)
    const arr = this.backingMap.get(hash)

    if (arr == null) {
      return Maybe.none
    }

    let c: Node<K, V> | undefined = arr

    while (c) {
      if (Equals.equals(k, c.k)) {
        return Maybe.some(c.v)
      }
      c = c.next
    }

    return Maybe.none
  }

  remove(k: K): MutableHashMap<K, V> {
    const hash = Hash.unknown(k)
    const arr = this.backingMap.get(hash)

    if (arr == null) {
      return this
    }

    if (Equals.equals(k, arr.k)) {
      if (arr.next != null) {
        this.backingMap.set(hash, arr.next)
      } else {
        this.backingMap.delete(hash)
      }
      this.length.decrementAndGet()
      return this
    }

    let next: Node<K, V> | undefined = arr.next
    let curr = arr

    while (next) {
      if (Equals.equals(k, next.k)) {
        curr.next = next.next
        this.length.decrementAndGet()
        return this
      }
      curr = next
      next = next.next
    }

    return this
  }

  set(k: K, v: V): MutableHashMap<K, V> {
    const hash = Hash.unknown(k)
    const arr = this.backingMap.get(hash)

    if (arr == null) {
      this.backingMap.set(hash, new Node(k, v))
      this.length.incrementAndGet()
      return this
    }

    let c: Node<K, V> | undefined = arr
    let l = arr

    while (c) {
      if (Equals.equals(k, c.k)) {
        c.v = v
        return this
      }
      l = c
      c = c.next
    }

    this.length.incrementAndGet()
    l.next = new Node(k, v)
    return this
  }

  update(k: K, f: (v: V) => V): MutableHashMap<K, V> {
    const hash = Hash.unknown(k)
    const arr = this.backingMap.get(hash)

    if (arr == null) {
      return this
    }

    let c: Node<K, V> | undefined = arr

    while (c) {
      if (Equals.equals(k, c.k)) {
        c.v = f(c.v)
        return this
      }
      c = c.next
    }

    return this
  }

  [Symbol.iterator](): Iterator<readonly [K, V]> {
    return ImmutableArray.from(this.backingMap.values())
      .map((node) => [node.k, node.v] as const)[Symbol.iterator]()
  }
}

class Node<K, V> implements Iterable<readonly [K, V]> {
  constructor(readonly k: K, public v: V, public next?: Node<K, V>) {}

  [Symbol.iterator](): Iterator<readonly [K, V]> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let c: Node<K, V> | undefined = this
    let n = 0
    return {
      next: () => {
        if (c) {
          const kv = [c.k, c.v] as const
          c = c.next
          n++
          return {
            value: kv,
            done: false
          }
        } else {
          return {
            value: n,
            done: true
          }
        }
      }
    }
  }
}

/**
 * @tsplus static MutableHashMap.Ops $
 */
export const MutableHashMapAspects: MutableHashMapAspects = {}

/**
 * @tsplus type MutableHashMap.Aspects
 */
export interface MutableHashMapAspects {}
