import {
  ArrTypeId,
  concreteChunk,
  SingletonTypeId
} from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Transforms all elements of the chunk for as long as the specified partial
 * function is defined.
 *
 * @tsplus static Chunk.Aspects collectWhile
 * @tsplus pipeable Chunk collectWhile
 */
export function collectWhile<A, B>(f: (a: A) => Maybe<B>) {
  return (self: Chunk<A>): Chunk<B> => {
    concreteChunk(self)

    switch (self._typeId) {
      case SingletonTypeId: {
        return f(self.a).fold(() => Chunk.empty(), Chunk.single)
      }
      case ArrTypeId: {
        const array = self._arrayLike()
        let dest = Chunk.empty<B>()
        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]!)
          if (rhs.isSome()) {
            dest = dest.append(rhs.value)
          } else {
            return dest
          }
        }
        return dest
      }
      default: {
        return self._materialize().collectWhile(f)
      }
    }
  }
}
