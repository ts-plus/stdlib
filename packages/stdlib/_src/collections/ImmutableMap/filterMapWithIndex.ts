/**
 * Applies the specified partial function to each entry of the map, filtering
 * out `None` values.
 *
 * @tsplus fluent ImmutableMap filterMapWithIndex
 */
export function filterMapWithIndex_<K, V, B>(
  self: ImmutableMap<K, V>,
  pf: (key: K, value: V) => Option<B>
): ImmutableMap<K, B> {
  const map = new Map<K, B>()
  for (const [key, value] of self.internalMap) {
    const result = pf(key, value)
    if (result.isSome()) {
      map.set(key, result.value)
    }
  }
  return new ImmutableMap(map)
}

/**
 * Applies the specified partial function to each entry of the map, filtering
 * out `None` values.
 *
 * @tsplus static ImmutableMap/Aspects filterMapWithIndex
 */
export const filterMapWithIndex = Pipeable(filterMapWithIndex_)
