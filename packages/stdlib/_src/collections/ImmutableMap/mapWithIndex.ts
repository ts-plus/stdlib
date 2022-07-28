/**
 * Transforms the values of the map using the specified function.
 *
 * @tsplus static ImmutableMap.Aspects mapWithIndex
 * @tsplus pipeable ImmutableMap mapWithIndex
 */
export function mapWithIndex<K, V, B>(f: (key: K, value: V) => B) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, B> => {
    const map = new Map<K, B>()
    for (const [key, value] of self.internalMap) {
      map.set(key, f(key, value))
    }
    return new ImmutableMap(map)
  }
}
