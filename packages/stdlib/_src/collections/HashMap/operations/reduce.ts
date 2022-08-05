/**
 * Reduces the specified state over the values of the `HashMap`.
 *
 * @tsplus static HashMap.Aspects reduce
 * @tsplus pipeable HashMap reduce
 */
export function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z) {
  return <K>(self: HashMap<K, V>): Z => self.reduceWithIndex(z, (z, _, v) => f(z, v))
}
