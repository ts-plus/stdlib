/**
 * Visit each node of the tree in order.
 *
 * @tsplus static RedBlackTree.Aspects forEach
 * @tsplus pipeable RedBlackTree forEach
 */
export function forEach<K, V>(visit: (key: K, value: V) => void) {
  return (self: RedBlackTree<K, V>): void => {
    if (self.root) {
      RedBlackTree.visitFull(self.root, (key, value) => {
        visit(key, value)
        return Maybe.none
      })
    }
  }
}
