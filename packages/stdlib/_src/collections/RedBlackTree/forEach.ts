/**
 * Visit each node of the tree in order.
 *
 * @tsplus fluent RedBlackTree forEach
 */
export function forEach_<K, V>(
  self: RedBlackTree<K, V>,
  visit: (key: K, value: V) => void
): void {
  if (self.root) {
    RedBlackTree.visitFull(self.root, (key, value) => {
      visit(key, value)
      return Option.none
    })
  }
}

/**
 * Visit each node of the tree in order.
 *
 * @tsplus static RedBlackTree/Aspects forEach
 */
export const forEach = Pipeable(forEach_)
