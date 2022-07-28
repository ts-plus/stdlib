import type { Direction } from "@tsplus/stdlib/collections/RedBlackTree/definition"

/**
 * Get the values of the tree.
 *
 * @tsplus static RedBlackTree.Aspects values
 * @tsplus pipeable RedBlackTree values
 */
export function values_<K, V>(direction: Direction = "Forward") {
  return (self: RedBlackTree<K, V>): IterableIterator<V> => {
    const begin = self[Symbol.iterator]()
    let count = 0
    return {
      [Symbol.iterator]: () => self.values(direction),
      next: (): IteratorResult<V> => {
        count++
        const entry = begin.value
        if (direction === "Forward") {
          begin.moveNext()
        } else {
          begin.movePrev()
        }
        return entry.fold(
          () => ({ value: count, done: true }),
          (entry) => ({ value: entry, done: false })
        )
      }
    }
  }
}
