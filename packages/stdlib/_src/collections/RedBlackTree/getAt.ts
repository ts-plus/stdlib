import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Returns the element at the specified index within the tree or `None` if the
 * specified index does not exist.
 *
 * @tsplus static RedBlackTree.Aspects getAt
 * @tsplus pipeable RedBlackTree getAt
 */
export function getAt(index: number) {
  return <K, V>(self: RedBlackTree<K, V>): Maybe<readonly [K, V]> => {
    if (index < 0) {
      return Maybe.none
    }
    let n = self.root
    let node: Node<K, V> | undefined = undefined
    while (n) {
      node = n
      if (n.left) {
        if (index < n.left.count) {
          n = n.left
          continue
        }
        index -= n.left.count
      }
      if (!index) {
        return Maybe.some([node.key, node.value])
      }
      index -= 1
      if (n.right) {
        if (index >= n.right.count) {
          break
        }
        n = n.right
      } else {
        break
      }
    }
    return Maybe.none
  }
}
