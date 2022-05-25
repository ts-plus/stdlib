/**
 * Visit each node of the tree in order with key lower than max and greater
 * than or equal to min.
 *
 * @tsplus fluent RedBlackTree forEachBetween
 */
export function forEachBetween_<K, V>(
  self: RedBlackTree<K, V>,
  min: K,
  max: K,
  visit: (key: K, value: V) => void
) {
  if (self.root) {
    RedBlackTree.visitBetween(self.root, min, max, self.ord, (key, value) => {
      visit(key, value)
      return Option.none
    })
  }
}

/**
 * Visit each node of the tree in order with key lower than max and greater
 * than or equal to min.
 *
 * @tsplus static RedBlackTree/Aspects forEachBetween
 */
export const forEachBetween = Pipeable(forEachBetween_)
