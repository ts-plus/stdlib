/**
 * Finds the item with key if it exists.
 *
 * @tsplus static RedBlackTree.Aspects has
 * @tsplus pipeable RedBlackTree has
 */
export function has<K, V>(key: K) {
  return (self: RedBlackTree<K, V>): boolean => self.findFirst(key).isSome()
}
