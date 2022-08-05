import { ArrTypeId, concreteChunk } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @tsplus static Chunk.Aspects collectWithIndex
 * @tsplus pipeable Chunk collectWithIndex
 */
export function collectWithIndex<A, B>(f: (index: number, a: A) => Maybe<B>) {
  return (self: Chunk<A>): Chunk<B> => {
    concreteChunk(self)

    switch (self._typeId) {
      case ArrTypeId: {
        const array = self._arrayLike()
        let dest = Chunk.empty<B>()
        for (let i = 0; i < array.length; i++) {
          const rhs = f(i, array[i]!)
          if (rhs.isSome()) {
            dest = dest.append(rhs.value)
          }
        }
        return dest
      }
      default: {
        return self._materialize().collectWithIndex(f)
      }
    }
  }
}
