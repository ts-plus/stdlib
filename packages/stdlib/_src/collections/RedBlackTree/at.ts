import type { Direction, RedBlackTreeIterable } from "@tsplus/stdlib/collections/RedBlackTree/definition";
import { RedBlackTreeIterator } from "@tsplus/stdlib/collections/RedBlackTree/definition";
import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node";

/**
 * Returns an iterator that points to the element at the spcified index of the
 * tree.
 *
 * @tsplus fluent RedBlackTree at
 */
export function at_<K, V>(
  self: RedBlackTree<K, V>,
  index: number,
  direction: Direction = "Forward"
): RedBlackTreeIterable<K, V> {
  return {
    ord: self.ord,
    [Symbol.iterator]: () => {
      if (index < 0) {
        return new RedBlackTreeIterator(self, [], direction);
      }
      let n = self.root;
      const stack: Node<K, V>[] = [];
      while (n) {
        stack.push(n);
        if (n.left) {
          if (index < n.left.count) {
            n = n.left;
            continue;
          }
          index -= n.left.count;
        }
        if (!index) {
          return new RedBlackTreeIterator(self, stack, direction);
        }
        index -= 1;
        if (n.right) {
          if (index >= n.right.count) {
            break;
          }
          n = n.right;
        } else {
          break;
        }
      }
      return new RedBlackTreeIterator(self, [], direction);
    }
  };
}

/**
 * Returns an iterator that points to the element at the spcified index of the
 * tree.
 *
 * @tsplus static RedBlackTree/Aspects at
 */
export const at = Pipeable(at_);
