import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"

/**
 * Finds the item with key if it exists.
 *
 * @tsplus static RedBlackTree.Aspects find
 * @tsplus pipeable RedBlackTree find
 */
export function find<K>(key: K) {
  return <V>(self: RedBlackTree<K, V>): ImmutableArray<V> => {
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
}
