import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node";

/**
 * Returns the element at the specified index within the tree or `None` if the
 * specified index does not exist.
 *
 * @tsplus fluent RedBlackTree getAt
 */
export function getAt_<K, V>(
  self: RedBlackTree<K, V>,
  index: number
): Option<Tuple<[K, V]>> {
  if (index < 0) {
    return Option.none;
  }
  let n = self.root;
  let node: Node<K, V> | undefined = undefined;
  while (n) {
    node = n;
    if (n.left) {
      if (index < n.left.count) {
        n = n.left;
        continue;
      }
      index -= n.left.count;
    }
    if (!index) {
      return Option.some(Tuple(node.key, node.value));
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
  return Option.none;
}

/**
 * Returns the element at the specified index within the tree or `None` if the
 * specified index does not exist.
 *
 * @tsplus static RedBlackTree/Aspects getAt
 */
export const getAt = Pipeable(getAt_);
