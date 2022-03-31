import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Returns the first index for which the given predicate is satisfied after or
 * at some given index.
 *
 * @tsplus fluent Chunk indexWhereFrom
 */
export function indexWhereFrom_<A>(
  self: Chunk<A>,
  from: number,
  f: Predicate<A>
): number {
  const iterator = concreteChunkId(self)._arrayLikeIterator();
  let next;
  let i = 0;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    if (i + len - 1 >= from) {
      let j = 0;
      while (j < len) {
        const a = array[j]!;
        if (i >= from && f(a)) {
          return i;
        }
        j++;
        i++;
      }
    } else {
      i += len;
    }
  }

  return -1;
}

/**
 * Returns the first index for which the given predicate is satisfied after or
 * at some given index.
 *
 * @tsplus static Chunk/Aspects indexWhereFrom
 */
export const indexWhereFrom = Pipeable(indexWhereFrom_);
