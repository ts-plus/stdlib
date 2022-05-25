import { ArrTypeId, concreteChunk } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Drops all elements so long as the predicate returns true.
 *
 * @tsplus fluent Chunk dropWhile
 */
export function dropWhile_<A>(self: Chunk<A>, f: (a: A) => boolean): Chunk<A> {
  concreteChunk(self)

  switch (self._typeId) {
    case ArrTypeId: {
      const arr = self._arrayLike()
      const len = arr.length
      let i = 0
      while (i < len && f(arr[i]!)) {
        i++
      }
      return (self as Chunk<A>).drop(i)
    }
    default: {
      const iterator = self._arrayLikeIterator()
      let cont = true
      let i = 0
      let next

      while (cont && (next = iterator.next()) && !next.done) {
        const array = next.value
        const len = array.length
        let j = 0
        while (cont && j < len) {
          const a = array[j]!
          if (f(a)) {
            i++
            j++
          } else {
            cont = false
          }
        }
      }
      return (self as Chunk<A>).drop(i)
    }
  }
}

/**
 * Drops all elements so long as the predicate returns true.
 *
 * @tsplus static Chunk/Aspects dropWhile
 */
export const dropWhile = Pipeable(dropWhile_)
