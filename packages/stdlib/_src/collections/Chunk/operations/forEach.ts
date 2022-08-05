import { ArrTypeId, concreteChunk } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Iterate over the chunk applying `f`.
 *
 * @tsplus static Chunk.Aspects forEach
 * @tsplus pipeable Chunk forEach
 */
export function forEach<A, U>(f: (a: A) => U) {
  return (self: Chunk<A>): void => {
    concreteChunk(self)

    switch (self._typeId) {
      case ArrTypeId: {
        const arr = self._arrayLike()
        const len = arr.length
        let i = 0
        while (i < len) {
          f(arr[i]!)
          i++
        }
        return
      }
      default: {
        const iterator = self._arrayLikeIterator()
        let next

        while ((next = iterator.next()) && !next.done) {
          const array = next.value
          const len = array.length
          let i = 0
          while (i < len) {
            const a = array[i]!
            f(a)
            i++
          }
        }

        return
      }
    }
  }
}
