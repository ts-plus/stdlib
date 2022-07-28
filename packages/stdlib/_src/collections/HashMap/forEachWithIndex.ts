/**
 * Applies the specified function to the entries of the `HashMap`.a
 *
 * @tsplus static HashMap.Aspects forEachWithIndex
 * @tsplus pipeable HashMap forEachWithIndex
 */
export function forEachWithIndex<K, V>(f: (k: K, v: V) => void) {
  return (self: HashMap<K, V>): void => self.reduceWithIndex(undefined as void, (_, key, value) => f(key, value))
}
