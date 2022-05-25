/**
 * Visit each node of the tree in order with key lower then max.
 *
 * @tsplus fluent RedBlackTree forEachLt
 */
export function forEachLt_<K, V>(
  self: RedBlackTree<K, V>,
  max: K,
  visit: (key: K, value: V) => void
) {
  if (self.root) {
    RedBlackTree.visitLt(self.root, max, self.ord, (key, value) => {
      visit(key, value)
      return Option.none
    })
  }
}

/**
 * Visit each node of the tree in order with key lower then max.
 *
 * @tsplus static RedBlackTree/Aspects forEachLt
 */
export const forEachLt = Pipeable(forEachLt_)
