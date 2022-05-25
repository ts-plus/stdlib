/**
 * Applies the specified predicate to each entry of the map, filitering out any
 * values that do not satisfy the predicate.
 *
 * @tsplus fluent ImmutableMap filterWithIndex
 */
export function filterWithIndex_<K, V, B extends V>(
  self: ImmutableMap<K, V>,
  f: (key: K, value: V) => value is B
): ImmutableMap<V, B>
export function filterWithIndex_<K, V>(
  self: ImmutableMap<K, V>,
  f: (key: K, value: V) => boolean
): ImmutableMap<K, V>
export function filterWithIndex_<K, V>(
  self: ImmutableMap<K, V>,
  f: (key: K, value: V) => boolean
): ImmutableMap<K, V> {
  const map = new Map<K, V>()
  for (const [key, value] of self.internalMap) {
    if (f(key, value)) {
      map.set(key, value)
    }
  }
  return new ImmutableMap(map)
}

/**
 * Applies the specified predicate to each entry of the map, filitering out any
 * values that do not satisfy the predicate.
 *
 * @tsplus static ImmutableMap/Aspects filterWithIndex
 */
export function filterWithIndex<K, V, B extends V>(
  f: (key: K, value: V) => value is B
): (self: ImmutableMap<K, V>) => ImmutableMap<K, B>
export function filterWithIndex<K, V>(
  f: (key: K, value: V) => boolean
): (self: ImmutableMap<K, V>) => ImmutableMap<K, V>
export function filterWithIndex<K, V>(f: (key: K, value: V) => boolean) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, V> => self.filterWithIndex(f)
}
