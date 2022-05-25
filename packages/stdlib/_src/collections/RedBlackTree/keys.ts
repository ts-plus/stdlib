import type { Direction } from "@tsplus/stdlib/collections/RedBlackTree/definition"

/**
 * Get the keys of the tree.
 *
 * @tsplus fluent RedBlackTree keys
 */
export function keys_<K, V>(
  self: RedBlackTree<K, V>,
  direction: Direction = "Forward"
): IterableIterator<K> {
  const begin = self[Symbol.iterator]()
  let count = 0
  return {
    [Symbol.iterator]: () => keys_(self, direction),
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

/**
 * Get the keys of the tree.
 *
 * @tsplus static RedBlackTree/Aspects keys
 */
export const keys = Pipeable(keys_)
