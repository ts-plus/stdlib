/**
 * @tsplus static SortedMap.Aspects reduce
 * @tsplus pipeable SortedMap reduce
 */
export function reduce<V, Z>(z: Z, f: (acc: Z, v: V) => Z) {
  return <K>(self: SortedMap<K, V>): Z => self.reduceWithIndex(z, (acc, _, v) => f(acc, v))
}
