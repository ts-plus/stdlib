/**
 * Visit each node of the tree in order with key lower then max.
 *
 * @tsplus static RedBlackTree.Aspects forEachLt
 * @tsplus pipeable RedBlackTree forEachLt
 */
export function forEachLt<K, V>(max: K, visit: (key: K, value: V) => void) {
  return (self: RedBlackTree<K, V>): void => {
    if (self.root) {
      RedBlackTree.visitLt(self.root, max, self.ord, (key, value) => {
        visit(key, value)
        return Maybe.none
      })
    }
  }
}
