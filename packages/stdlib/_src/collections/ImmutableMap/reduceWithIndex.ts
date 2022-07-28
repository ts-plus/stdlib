/**
 * Reduces the specified state over the entries of the `ImmutableMap`.
 *
 * @tsplus static ImmutableMap.Aspects reduceWithIndex
 * @tsplus pipeable ImmutableMap reduceWithIndex
 */
export function reduceWithIndex<K, V, Z>(z: Z, f: (z: Z, k: K, v: V) => Z) {
  return (self: ImmutableMap<K, V>): Z => {
    let s = z
    self.internalMap.forEach((v, k) => {
      s = f(s, k, v)
    })
    return s
  }
}
