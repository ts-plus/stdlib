import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Returns the first entry in the tree.
 *
 * @tsplus getter RedBlackTree first
 */
export function first<K, V>(tree: RedBlackTree<K, V>): Maybe<readonly [K, V]> {
  let n: Node<K, V> | undefined = tree.root
  let c: Node<K, V> | undefined = tree.root
  while (n) {
    c = n
    n = n.left
  }
  return c ? Maybe.some([c.key, c.value]) : Maybe.none
}
