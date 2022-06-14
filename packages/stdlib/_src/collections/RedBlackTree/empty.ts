import { RedBlackTreeInternal } from "@tsplus/stdlib/collections/RedBlackTree/_internal/RedBlackTreeInternal"

/**
 * @tsplus static RedBlackTree/Ops empty
 */
export function empty<K, V>(
  ord: Ord<K>
): RedBlackTree<K, V> {
  return new RedBlackTreeInternal<K, V>(ord, undefined)
}
