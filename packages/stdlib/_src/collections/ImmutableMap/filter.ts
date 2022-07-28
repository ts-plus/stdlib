/**
 * Applies the specified predicate to each entry of the map, filitering out any
 * values that do not satisfy the predicate.
 *
 * @tsplus static ImmutableMap.Aspects filter
 * @tsplus pipeable ImmutableMap filter
 */
export function filter<V, B extends V>(
  f: Refinement<V, B>
): <K>(self: ImmutableMap<K, V>) => ImmutableMap<V, B>
export function filter<V>(
  f: Predicate<V>
): <K>(self: ImmutableMap<K, V>) => ImmutableMap<K, V>
export function filter<V>(f: Predicate<V>) {
  return <K>(self: ImmutableMap<K, V>): ImmutableMap<K, V> => {
    const map = new Map<K, V>()
    for (const [key, value] of self.internalMap) {
      if (f(value)) {
        map.set(key, value)
      }
    }
    return new ImmutableMap(map)
  }
}
