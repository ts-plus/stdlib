import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Returns the last entry in the tree.
 *
 * @tsplus getter RedBlackTree last
 */
export function last<K, V>(tree: RedBlackTree<K, V>): Option<Tuple<[K, V]>> {
  let n: Node<K, V> | undefined = tree.root
  let c: Node<K, V> | undefined = tree.root
  while (n) {
    c = n
    n = n.right
  }
  return c ? Option.some(Tuple(c.key, c.value)) : Option.none
}
