/**
 * Visit each node of the tree in order with key greater then or equal to max.
 *
 * @tsplus static RedBlackTree.Aspects forEachGe
 * @tsplus pipeable RedBlackTree forEachGe
 */
export function forEachGe<K, V>(min: K, visit: (key: K, value: V) => void) {
  return (self: RedBlackTree<K, V>): void => {
    if (self.root) {
      RedBlackTree.visitGe(self.root, min, self.ord, (key, value) => {
        visit(key, value)
        return Maybe.none
      })
    }
  }
}
