/**
 * @tsplus static SortedMap.Aspects map
 * @tsplus pipeable SortedMap map
 */
export function map<V, B>(f: (v: V) => B) {
  return <K>(self: SortedMap<K, V>): SortedMap<K, B> => {
    return self.mapWithIndex((_, v: V) => f(v))
  }
}
