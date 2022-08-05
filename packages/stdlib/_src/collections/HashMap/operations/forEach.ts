/**
 * Applies the specified function to the values of the `HashMap`.
 *
 * @tsplus static HashMap.Aspects forEach
 * @tsplus pipeable HashMap forEach
 */
export function forEach<V>(f: (v: V) => void) {
  return <K>(self: HashMap<K, V>): void => self.forEachWithIndex((_, value) => f(value))
}
