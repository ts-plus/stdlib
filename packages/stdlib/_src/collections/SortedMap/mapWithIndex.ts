/**
 * @tsplus fluent SortedMap mapWithIndex
 */
export function mapWithIndex_<K, V, A>(
  self: SortedMap<K, V>,
  f: (k: K, v: V) => A
): SortedMap<K, A> {
  return self.reduceWithIndex(SortedMap.make<K, A>(self.getOrd()), (b, k, v) => b.set(k, f(k, v)))
}

/**
 * @tsplus static SortedMap/Aspects mapWithIndex
 */
export const mapWithIndex = Pipeable(mapWithIndex_)
