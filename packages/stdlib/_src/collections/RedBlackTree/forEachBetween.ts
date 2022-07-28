/**
 * Visit each node of the tree in order with key lower than max and greater
 * than or equal to min.
 *
 * @tsplus static RedBlackTree.Aspects forEachBetween
 * @tsplus pipeable RedBlackTree forEachBetween
 */
export function forEachBetween<K, V>(min: K, max: K, visit: (key: K, value: V) => void) {
  return (self: RedBlackTree<K, V>): void => {
    if (self.root) {
      RedBlackTree.visitBetween(self.root, min, max, self.ord, (key, value) => {
        visit(key, value)
        return Maybe.none
      })
    }
  }
}
