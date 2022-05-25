import type { RedBlackTreeIterable } from "@tsplus/stdlib/collections/RedBlackTree"

/**
 * Constructs a new tree from an iterable of key-value pairs.
 *
 * @tsplus static RedBlackTree/Ops __call
 */
export function from<K, V>(iterable: RedBlackTreeIterable<K, V>): RedBlackTree<K, V>
export function from<K, V>(
  iterable: Collection<Tuple<[K, V]>>,
  ord: Ord<K>
): RedBlackTree<K, V>
export function from<K, V>(
  ...args: [RedBlackTreeIterable<K, V>] | [Iterable<Tuple<[K, V]>>, Ord<K>]
): RedBlackTree<K, V> {
  let tree = args.length === 2 ? RedBlackTree.make<K, V>(args[1]) : RedBlackTree.make<K, V>(args[0].ord)

  for (const { tuple: [k, v] } of args[0]) {
    tree = tree.insert(k, v)
  }

  return tree
}
