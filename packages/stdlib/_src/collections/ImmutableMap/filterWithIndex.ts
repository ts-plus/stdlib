/**
 * Applies the specified predicate to each entry of the map, filitering out any
 * values that do not satisfy the predicate.
 *
 * @tsplus static ImmutableMap.Aspects filterWithIndex
 * @tsplus pipeable ImmutableMap filterWithIndex
 */
export function filterWithIndex<K, V, B extends V>(
  f: (key: K, value: V) => value is B
): (self: ImmutableMap<K, V>) => ImmutableMap<V, B>
export function filterWithIndex<K, V>(
  f: (key: K, value: V) => boolean
): (self: ImmutableMap<K, V>) => ImmutableMap<K, V>
export function filterWithIndex<K, V>(f: (key: K, value: V) => boolean) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, V> => {
    const map = new Map<K, V>()
    for (const [key, value] of self.internalMap) {
      if (f(key, value)) {
        map.set(key, value)
      }
    }
    return new ImmutableMap(map)
  }
}
