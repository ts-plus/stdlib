import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns the index of the first element that satisfies the predicate.
 *
 * @tsplus fluent Chunk findIndex
 */
export function findIndex_<A>(self: Chunk<A>, f: Predicate<A>): Option<number> {
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
        return Option.some(index)
      }
      i++
      index++
    }
  }

  return Option.none
}

/**
 * Returns the index of the first element that satisfies the predicate.
 *
 * @tsplus static Chunk/Aspects findIndex
 */
export const findIndex = Pipeable(findIndex_)
