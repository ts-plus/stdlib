/**
 * Reduce a state over the map entries.
 *
 * @tsplus fluent RedBlackTree reduceWithIndex
 */
export function reduceWithIndex_<K, V, Z>(
  self: RedBlackTree<K, V>,
  z: Z,
  f: (z: Z, k: K, v: V) => Z
): Z {
  let x = z
  for (const { tuple: [k, v] } of self) {
    x = f(x, k, v)
  }
  return x
}

/**
 * Reduce a state over the map entries.
 *
 * @tsplus static RedBlackTree/Aspects reduceWithIndex
 */
export const reduceWithIndex = Pipeable(reduceWithIndex_)
