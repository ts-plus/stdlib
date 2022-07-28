/**
 * @tsplus static SortedMap.Aspects mapWithIndex
 * @tsplus pipeable SortedMap mapWithIndex
 */
export function mapWithIndex<K, V, A>(f: (k: K, v: V) => A) {
  return (self: SortedMap<K, V>): SortedMap<K, A> =>
    self.reduceWithIndex(SortedMap.empty<K, A>(self.getOrd), (b, k, v) => b.set(k, f(k, v)))
}
