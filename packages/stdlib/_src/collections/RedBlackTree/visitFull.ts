import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Visit all nodes in order until a `Some` is returned.
 *
 * @tsplus static RedBlackTree/Ops visitFull
 */
export function visitFull<K, V, A>(
  node: Node<K, V>,
  visit: (key: K, value: V) => Maybe<A>
): Maybe<A> {
  let current: Node<K, V> | undefined = node
  let stack: Stack<Node<K, V>> | undefined = undefined
  let done = false

  while (!done) {
    if (current) {
      stack = new Stack(current, stack)
      current = current.left
    } else if (stack) {
      const v = visit(stack.value.key, stack.value.value)

      if (v.isSome()) {
        return v
      }

      current = stack.value.right
      stack = stack.previous
    } else {
      done = true
    }
  }

  return Maybe.none
}
