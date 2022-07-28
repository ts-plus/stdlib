import { ArrTypeId, concreteChunk } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a filtered subset of this chunk.
 *
 * @tsplus static Chunk.Aspects filter
 * @tsplus pipeable Chunk filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: Chunk<A>) => Chunk<B>
export function filter<A>(f: Predicate<A>): (self: Chunk<A>) => Chunk<A>
export function filter<A>(f: Predicate<A>) {
  return (self: Chunk<A>): Chunk<A> => {
    concreteChunk(self)

    switch (self._typeId) {
      case ArrTypeId: {
        const arr = self._arrayLike()
        const len = arr.length
        let i = 0
        let builder = Chunk.empty<A>()
        while (i < len) {
          const elem = arr[i]!
          if (f(elem)) {
            builder = builder.append(elem)
          }
          i++
        }
        return builder
      }
      default: {
        const iterator = self._arrayLikeIterator()
        let next
        let builder = Chunk.empty<A>()
        while ((next = iterator.next()) && !next.done) {
          const array = next.value
          const len = array.length
          let i = 0
          while (i < len) {
            const a = array[i]!
            if (f(a)) {
              builder = builder.append(a)
            }
            i++
          }
        }

        return builder
      }
    }
  }
}
