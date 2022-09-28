/**
 * @tsplus type ImmutableMap
 * @tsplus companion ImmutableMap.Ops
 */
export class ImmutableMap<K, V> implements Equals, Collection<readonly [K, V]> {
  constructor(readonly internalMap: ReadonlyMap<K, V>) {}

  [Symbol.iterator](): Iterator<readonly [K, V]> {
    const iterator = this.internalMap[Symbol.iterator]()
    return {
      next: () => {
        const next = iterator.next()
        if (next.done) {
          return { done: true, value: undefined }
        }
        return { done: false, value: [next.value[0], next.value[1]] }
      }
    }
  }

  [Equals.sym](this: this, other: unknown): boolean {
    if (other instanceof ImmutableMap && this.internalMap.size === other.internalMap.size) {
      for (const [otherKey, otherValue] of other.internalMap) {
        if (this.internalMap.has(otherKey)) {
          const value = this.internalMap.get(otherKey)
          if (!Equals.equals(value, otherValue)) {
            return false
          }
        } else {
          return false
        }
      }
      return true
    }
    return false
  }

  [Hash.sym](): number {
    let hash = Hash.string("ImmutableMap")
    for (const item of this) {
      hash ^= Hash.combine(Hash.unknown(item[0]), Hash.unknown(item[1]))
    }
    return Hash.optimize(hash)
  }
}

/**
 * @tsplus static ImmutableMap.Ops $
 */
export const ImmutableMapAspects: ImmutableMapAspects = {}

/**
 * @tsplus type ImmutableMap.Aspects
 */
export interface ImmutableMapAspects {}
