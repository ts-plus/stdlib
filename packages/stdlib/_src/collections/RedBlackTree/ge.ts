import type { Direction, RedBlackTreeIterable } from "@tsplus/stdlib/collections/RedBlackTree/definition";
import { RedBlackTreeIterator } from "@tsplus/stdlib/collections/RedBlackTree/definition";

/**
 * Returns an iterator that traverse entries with keys greater than or equal to
 * the specified key.
 *
 * @tsplus fluent RedBlackTree ge
 */
export function ge_<K, V>(
  self: RedBlackTree<K, V>,
  key: K,
  direction: Direction = "Forward"
): RedBlackTreeIterable<K, V> {
  return {
    ord: self.ord,
    [Symbol.iterator]: () => {
      const cmp = self.ord.compare;
      let n = self.root;
      const stack = [];
      let last_ptr = 0;
      while (n) {
        const d = cmp(key, n.key);
        stack.push(n);
        if (d <= 0) {
          last_ptr = stack.length;
        }
        if (d <= 0) {
          n = n.left;
        } else {
          n = n.right;
        }
      }
      stack.length = last_ptr;
      return new RedBlackTreeIterator(self, stack, direction);
    }
  };
}

/**
 * Returns an iterator that traverse entries with keys greater than or equal to
 * the specified key.
 *
 * @tsplus static RedBlackTree/Aspects ge
 */
export const ge = Pipeable(ge_);
