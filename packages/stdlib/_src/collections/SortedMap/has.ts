/**
 * @tsplus static SortedMap.Aspects has
 * @tsplus pipeable SortedMap has
 */
export function has<K>(key: K) {
  return <V>(self: SortedMap<K, V>): boolean => {
    return self.get(key).isSome()
  }
}
