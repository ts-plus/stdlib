import { ArrTypeId, concreteChunk, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Folds over the elements in this chunk from the right.
 *
 * @tsplus fluent Chunk reduceRight
 */
export function reduceRight_<A, S>(self: Chunk<A>, s: S, f: (a: A, s: S) => S): S {
  concreteChunk(self)

  switch (self._typeId) {
    case SingletonTypeId: {
      return f(self.a, s)
    }
    case ArrTypeId: {
      const arr = self._arrayLike()
      const len = arr.length
      let s1 = s
      let i = len - 1
      while (i >= 0) {
        s1 = f(arr[i]!, s1)
        i--
      }
      return s1
    }
    default: {
      const iterator = self._reverseArrayLikeIterator()
      let next
      let s1 = s

      while ((next = iterator.next()) && !next.done) {
        const array = next.value
        const len = array.length
        let i = len - 1
        while (i >= 0) {
          const a = array[i]!
          s1 = f(a, s1)
          i--
        }
      }

      return s1
    }
  }
}

/**
 * Folds over the elements in this chunk from the right.
 *
 * @tsplus static Chunk/Aspects reduceRight
 */
export const reduceRight = Pipeable(reduceRight_)
