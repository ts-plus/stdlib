/**
 * Applies the specified partial function to each entry of the map, filtering
 * out `None` values.
 *
 * @tsplus static ImmutableMap.Aspects filterMapWithIndex
 * @tsplus pipeable ImmutableMap filterMapWithIndex
 */
export function filterMapWithIndex<K, V, B>(pf: (key: K, value: V) => Maybe<B>) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, B> => {
    const map = new Map<K, B>()
    for (const [key, value] of self.internalMap) {
      const result = pf(key, value)
      if (result.isSome()) {
        map.set(key, result.value)
      }
    }
    return new ImmutableMap(map)
  }
}
