import type { Direction } from "@tsplus/stdlib/collections/RedBlackTree/definition"

/**
 * Get the keys of the tree.
 *
 * @tsplus static RedBlackTree.Aspects keys
 * @tsplus pipeable RedBlackTree keys
 */
export function keys(direction: Direction = "Forward") {
  return <K, V>(self: RedBlackTree<K, V>): IterableIterator<K> => {
    const begin = self[Symbol.iterator]()
    let count = 0
    return {
      [Symbol.iterator]: () => self.keys(direction),
      next: (): IteratorResult<K> => {
        count++
        const entry = begin.key
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
