/**
 * Constructs a new tree from an iterable of key-value pairs.
 *
 * @tsplus static RedBlackTree.Ops from
 */
export function from<K, V>(
  ord: Ord<K>
): (
  data: Collection<readonly [K, V]>
) => RedBlackTree<K, V> {
  return (
    data: Collection<readonly [K, V]>
  ) => {
    let tree = RedBlackTree.empty<K, V>(ord)

    for (const [k, v] of data) {
      tree = tree.insert(k, v)
    }

    return tree
  }
}
