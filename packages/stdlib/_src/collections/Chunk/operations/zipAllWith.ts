import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Zips with chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk combined using the specified function
 * `both`. If one chunk is shorter than the other uses the specified
 * function `left` or `right` to map the element that does exist to the
 * result type.
 *
 * @tsplus static Chunk.Aspects zipAllWith
 * @tsplus pipeable Chunk zipAllWith
 */
export function zipAllWith<A, B, C, D, E>(
  that: Chunk<B>,
  f: (a: A, b: B) => C,
  left: (a: A) => D,
  right: (b: B) => E
) {
  return (self: Chunk<A>): Chunk<C | D | E> => {
    const length = Math.max(concreteChunkId(self).length, concreteChunkId(that).length)

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
    let leftArray: ArrayLike<A> | undefined = undefined
    let rightArray: ArrayLike<B> | undefined = undefined
    let leftNext
    let rightNext
    let builder = Chunk.empty<C | D | E>()

    while (i < length) {
      if (j < leftLength && k < rightLength) {
        builder = builder.append(f(leftArray![j]!, rightArray![k]!))
        i++
        j++
        k++
      } else if (j === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
        leftArray = leftNext.value
        leftLength = leftArray.length
        j = 0
      } else if (
        k === rightLength &&
        (rightNext = rightIterator.next()) &&
        !rightNext.done
      ) {
        rightArray = rightNext.value
        rightLength = rightArray.length
        k = 0
      } else if (j < leftLength) {
        builder = builder.append(left(leftArray![j]!))
        i++
        j++
      } else if (k < rightLength) {
        builder = builder.append(right(rightArray![k]!))
        i++
        k++
      }
    }

    return builder
  }
}
