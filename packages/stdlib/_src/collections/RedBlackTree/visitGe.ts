import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Visit nodes greater than or equal to key.
 *
 * @tsplus static RedBlackTree/Ops visitGe
 */
export function visitGe<K, V, A>(
  node: Node<K, V>,
  min: K,
  ord: Ord<K>,
  visit: (key: K, value: V) => Option<A>
): Option<A> {
  let current: Node<K, V> | undefined = node
  let stack: Stack<Node<K, V>> | undefined = undefined
  let done = false

  while (!done) {
    if (current) {
      stack = new Stack(current, stack)
      if (ord.compare(min, current.key) <= 0) {
        current = current.left
      } else {
        current = undefined
      }
    } else if (stack) {
      if (ord.compare(min, stack.value.key) <= 0) {
        const v = visit(stack.value.key, stack.value.value)

        if (v.isSome()) {
          return v
        }
      }
      current = stack.value.right
      stack = stack.previous
    } else {
      done = true
    }
  }

  return Option.none
}
