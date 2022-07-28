/**
 * @tsplus static MutableHashMap.Aspects has
 * @tsplus pipeable MutableHashMap has
 */
export function has<K>(key: K) {
  return <V>(self: MutableHashMap<K, V>): boolean => self.get(key).isSome()
}
