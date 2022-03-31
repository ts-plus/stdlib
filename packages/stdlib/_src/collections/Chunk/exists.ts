import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Determines whether a predicate is satisfied for at least one element of this
 * chunk.
 *
 * @tsplus fluent Chunk exists
 */
export function exists_<A>(self: Chunk<A>, f: (a: A) => boolean): boolean {
  const iterator = concreteChunkId(self)._arrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;
    while (i < len) {
      const a = array[i]!;
      if (f(a)) {
        return true;
      }
      i++;
    }
  }

  return false;
}

/**
 * Determines whether a predicate is satisfied for at least one element of this
 * chunk.
 *
 * @tsplus static Chunk/Aspects exists
 */
export const exists = Pipeable(exists_);
