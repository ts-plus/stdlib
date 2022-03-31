/**
 * Returns the length of the tree.
 *
 * @tsplus getter RedBlackTree size
 */
export function size<K, V>(self: RedBlackTree<K, V>): number {
  return self.root?.count ?? 0;
}
