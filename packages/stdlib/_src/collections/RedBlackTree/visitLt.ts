import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node";

/**
 * Visit nodes lower than key.
 *
 * @tsplus static RedBlackTree/Ops visitLt
 */
export function visitLt<K, V, A>(
  node: Node<K, V>,
  max: K,
  ord: Ord<K>,
  visit: (key: K, value: V) => Option<A>
): Option<A> {
  let current: Node<K, V> | undefined = node;
  let stack: Stack<Node<K, V>> | undefined = undefined;
  let done = false;

  while (!done) {
    if (current) {
      stack = new Stack(current, stack);
      current = current.left;
    } else if (stack && ord.compare(max, stack.value.key) > 0) {
      const v = visit(stack.value.key, stack.value.value);

      if (v.isSome()) {
        return v;
      }

      current = stack.value.right;
      stack = stack.previous;
    } else {
      done = true;
    }
  }

  return Option.none;
}
