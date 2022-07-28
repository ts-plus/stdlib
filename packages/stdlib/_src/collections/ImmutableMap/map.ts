/**
 * Transforms the values of the map using the specified function.
 *
 * @tsplus static ImmutableMap.Aspects map
 * @tsplus pipeable ImmutableMap map
 */
export function map<V, B>(f: (value: V) => B) {
  return <K>(self: ImmutableMap<K, V>): ImmutableMap<K, B> => {
    const map = new Map<K, B>()
    for (const [key, value] of self.internalMap) {
      map.set(key, f(value))
    }
    return new ImmutableMap(map)
  }
}
