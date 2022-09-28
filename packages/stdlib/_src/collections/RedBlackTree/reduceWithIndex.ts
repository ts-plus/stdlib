/**
 * Reduce a state over the map entries.
 *
 * @tsplus static RedBlackTree.Aspects reduceWithIndex
 * @tsplus pipeable RedBlackTree reduceWithIndex
 */
export function reduceWithIndex<K, V, Z>(z: Z, f: (z: Z, k: K, v: V) => Z) {
  return (self: RedBlackTree<K, V>): Z => {
    let x = z
    for (const [k, v] of self) {
      x = f(x, k, v)
    }
    return x
  }
}
