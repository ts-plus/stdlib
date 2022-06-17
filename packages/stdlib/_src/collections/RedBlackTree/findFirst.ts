/**
 * Finds the item with key if it exists.
 *
 * @tsplus fluent RedBlackTree findFirst
 */
export function findFirst_<K, V>(self: RedBlackTree<K, V>, key: K): Maybe<V> {
  const cmp = self.ord.compare
  let n = self.root
  while (n) {
    const d = cmp(key, n.key)
    if (Equals.equals(key, n.key)) {
      return Maybe.some(n.value)
    }
    if (d <= 0) {
      n = n.left
    } else {
      n = n.right
    }
  }
  return Maybe.none
}

/**
 * Finds the item with key if it exists.
 *
 * @tsplus static RedBlackTree/Aspects findFirst
 */
export const findFirst = Pipeable(findFirst_)
