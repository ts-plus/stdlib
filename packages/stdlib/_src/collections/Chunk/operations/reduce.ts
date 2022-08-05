import { ArrTypeId, concreteChunk, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Folds over the elements in this chunk from the left.
 *
 * @tsplus static Chunk.Aspects reduce
 * @tsplus pipeable Chunk reduce
 */
export function reduce<A, S>(s: S, f: (s: S, a: A) => S) {
  return (self: Chunk<A>): S => {
    concreteChunk(self)

    switch (self._typeId) {
      case SingletonTypeId: {
        return f(s, self.a)
      }
      case ArrTypeId: {
        const arr = self._arrayLike()
        const len = arr.length
        let s1 = s
        let i = 0
        while (i < len) {
          s1 = f(s1, arr[i]!)
          i++
        }
        return s1
      }
      default: {
        const iterator = self._arrayLikeIterator()
        let next
        let s1 = s

        while ((next = iterator.next()) && !next.done) {
          const array = next.value
          const len = array.length
          let i = 0
          while (i < len) {
            const a = array[i]!
            s1 = f(s1, a)
            i++
          }
        }

        return s1
      }
    }
  }
}
