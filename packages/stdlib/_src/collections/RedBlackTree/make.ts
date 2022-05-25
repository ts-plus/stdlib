import { RedBlackTreeInternal } from "@tsplus/stdlib/collections/RedBlackTree/_internal/RedBlackTreeInternal"

/**
 * Creates a new Red-Black Tree.
 *
 * @tsplus static RedBlackTree/Ops make
 */
export function make<K, V>(ord: Ord<K>): RedBlackTree<K, V> {
  return new RedBlackTreeInternal<K, V>(ord, undefined)
}
