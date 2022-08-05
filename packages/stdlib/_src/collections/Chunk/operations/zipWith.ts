import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @tsplus static Chunk.Aspects zipWith
 * @tsplus pipeable Chunk zipWith
 */
export function zipWith<A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C) {
  return (self: Chunk<A>): Chunk<C> => {
    const length = Math.min(concreteChunkId(self).length, concreteChunkId(that).length)

    if (length === 0) {
      return Chunk.empty()
    }

    const leftIterator = concreteChunkId(self)._arrayLikeIterator()
    const rightIterator = concreteChunkId(that)._arrayLikeIterator()
    let i = 0
    let j = 0
    let k = 0
    let leftLength = 0
    let rightLength = 0
    let left: ArrayLike<A> | undefined = undefined
    let right: ArrayLike<B> | undefined = undefined
    let leftNext
    let rightNext
    let builder = Chunk.empty<C>()

    while (i < length) {
      if (j < leftLength && k < rightLength) {
        builder = builder.append(f(left![j]!, right![k]!))
        i++
        j++
        k++
      } else if (j === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
        left = leftNext.value
        leftLength = left.length
        j = 0
      } else if (
        k === rightLength &&
        (rightNext = rightIterator.next()) &&
        !rightNext.done
      ) {
        right = rightNext.value
        rightLength = right.length
        k = 0
      }
    }

    return builder
  }
}
