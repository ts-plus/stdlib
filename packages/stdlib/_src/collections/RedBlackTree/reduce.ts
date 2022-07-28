/**
 * Reduce a state over the map entries.
 *
 * @tsplus static RedBlackTree.Aspects reduce
 * @tsplus pipeable RedBlackTree reduce
 */
export function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z) {
  return <K>(self: RedBlackTree<K, V>): Z => self.reduceWithIndex(z, (z1, _, v) => f(z1, v))
}
