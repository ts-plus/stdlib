import type { RedBlackTreeIterable } from "@tsplus/stdlib/collections/RedBlackTree/definition"
import { RedBlackTreeIterator } from "@tsplus/stdlib/collections/RedBlackTree/definition"
import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Traverse the tree backwards.
 *
 * @tsplus getter RedBlackTree backwards
 */
export function backwards<K, V>(self: RedBlackTree<K, V>): RedBlackTreeIterable<K, V> {
  return {
    ord: self.ord,
    [Symbol.iterator]: () => {
      const stack: Node<K, V>[] = []
      let n = self.root
      while (n) {
        stack.push(n)
        n = n.right
      }
      return new RedBlackTreeIterator(self, stack, "Backward")
    }
  }
}
