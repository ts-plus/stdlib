/**
 * Visit each node of the tree in order with key greater then or equal to max.
 *
 * @tsplus fluent RedBlackTree forEachGe
 */
export function forEachGe_<K, V>(
  self: RedBlackTree<K, V>,
  min: K,
  visit: (key: K, value: V) => void
) {
  if (self.root) {
    RedBlackTree.visitGe(self.root, min, self.ord, (key, value) => {
      visit(key, value)
      return Option.none
    })
  }
}

/**
 * Visit each node of the tree in order with key greater then or equal to max.
 *
 * @tsplus static RedBlackTree/Aspects forEachGe
 */
export const forEachGe = Pipeable(forEachGe_)
