/**
 * Constructs a new tree from an iterable of key-value pairs.
 *
 * @tsplus static RedBlackTree.Ops from
 */
export function from<K, V>(
  ord: Ord<K>
): (
  data: Collection<Tuple<[K, V]>>
) => RedBlackTree<K, V> {
  return (
    data: Collection<Tuple<[K, V]>>
  ) => {
    let tree = RedBlackTree.empty<K, V>(ord)

    for (const { tuple: [k, v] } of data) {
      tree = tree.insert(k, v)
    }

    return tree
  }
}
