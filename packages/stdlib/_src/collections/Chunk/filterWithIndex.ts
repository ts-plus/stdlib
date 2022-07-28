import { ArrTypeId, Chunk, concreteChunk } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a filtered subset of this chunk.
 *
 * @tsplus static Chunk.Aspects filterWithIndex
 * @tsplus pipeable Chunk filterWithIndex
 */
export function filterWithIndex<A, B extends A>(
  f: RefinementWithIndex<number, A, B>
): (self: Chunk<A>) => Chunk<B>
export function filterWithIndex<A>(f: PredicateWithIndex<number, A>): (self: Chunk<A>) => Chunk<A>
export function filterWithIndex<A>(f: PredicateWithIndex<number, A>) {
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
          if (f(i, elem)) {
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
        let index = 0
        while ((next = iterator.next()) && !next.done) {
          const array = next.value
          const len = array.length
          let i = 0
          while (i < len) {
            const a = array[i]!
            if (f(index, a)) {
              builder = builder.append(a)
            }
            i++
            index++
          }
        }

        return builder
      }
    }
  }
}
