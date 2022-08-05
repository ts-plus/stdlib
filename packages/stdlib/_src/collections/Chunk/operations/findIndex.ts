import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns the index of the first element that satisfies the predicate.
 *
 * @tsplus static Chunk.Aspects findIndex
 * @tsplus pipeable Chunk findIndex
 */
export function findIndex<A>(f: Predicate<A>) {
  return (self: Chunk<A>): Maybe<number> => {
    const iterator = concreteChunkId(self)._arrayLikeIterator()
    let next
    let index = 0

    while ((next = iterator.next()) && !next.done) {
      const array = next.value
      const len = array.length
      let i = 0
      while (i < len) {
        const a = array[i]!
        if (f(a)) {
          return Maybe.some(index)
        }
        i++
        index++
      }
    }

    return Maybe.none
  }
}
