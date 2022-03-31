import type { Direction } from "@tsplus/stdlib/collections/RedBlackTree/definition";

/**
 * Get the values of the tree.
 *
 * @tsplus fluent RedBlackTree values
 */
export function values_<K, V>(
  self: RedBlackTree<K, V>,
  direction: Direction = "Forward"
): IterableIterator<V> {
  const begin = self[Symbol.iterator]();
  let count = 0;
  return {
    [Symbol.iterator]: () => values_(self, direction),
    next: (): IteratorResult<V> => {
      count++;
      const entry = begin.value;
      if (direction === "Forward") {
        begin.moveNext();
      } else {
        begin.movePrev();
      }
      return entry.fold(
        () => ({ value: count, done: true }),
        (entry) => ({ value: entry, done: false })
      );
    }
  };
}

/**
 * Get the values of the tree.
 *
 * @tsplus static RedBlackTree/Aspects values
 */
export const values = Pipeable(values_);
