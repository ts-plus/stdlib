import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 *
 * @tsplus static Chunk.Aspects forAny
 * @tsplus pipeable Chunk forAny
 */
export function forAny<A>(f: Predicate<A>) {
  return (self: Chunk<A>): boolean => {
    const iterator = concreteChunkId(self)._arrayLikeIterator()
    let next

    while ((next = iterator.next()) && !next.done) {
      const array = next.value
      const len = array.length
      let i = 0
      while (i < len) {
        const a = array[i]!
        if (f(a)) {
          return true
        }
        i++
      }
    }

    return false
  }
}
