/**
 * Reduce a state over the map entries.
 *
 * @tsplus fluent RedBlackTree reduce
 */
export function reduce_<K, V, Z>(
  self: RedBlackTree<K, V>,
  z: Z,
  f: (z: Z, v: V) => Z
): Z {
  return self.reduceWithIndex(z, (z1, _, v) => f(z1, v))
}

/**
 * Reduce a state over the map entries
 *
 * @tsplus static RedBlackTree/Aspects reduce
 */
export const reduce = Pipeable(reduce_)
