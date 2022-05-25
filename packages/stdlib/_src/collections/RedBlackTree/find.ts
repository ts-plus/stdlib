import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"

/**
 * Finds the item with key if it exists.
 *
 * @tsplus fluent RedBlackTree find
 */
export function find_<K, V>(self: RedBlackTree<K, V>, key: K): ImmutableArray<V> {
  const cmp = self.ord.compare
  let n = self.root
  const res: V[] = []
  while (n) {
    const d = cmp(key, n.key)
    if (d === 0 && Equals.equals(key, n.key)) {
      res.push(n.value)
    }
    if (d <= 0) {
      n = n.left
    } else {
      n = n.right
    }
  }

  return ImmutableArray.from(res.reverse())
}

/**
 * Finds the item with key if it exists.
 *
 * @tsplus static RedBlackTree/Aspects find
 */
export const find = Pipeable(find_)
