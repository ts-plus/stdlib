import {
  _Empty,
  concreteChunk,
  EmptyTypeId,
  SingletonTypeId,
  Slice,
  SliceTypeId
} from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Drops the first `n` elements.
 *
 * @tsplus static Chunk.Aspects drop
 * @tsplus pipeable Chunk drop
 */
export function drop(n: number) {
  return <A>(self: Chunk<A>): Chunk<A> => {
    concreteChunk(self)
    if (n <= 0) {
      return self
    } else if (n >= self.length) {
      return _Empty
    } else {
      const len = self.length
      switch (self._typeId) {
        case EmptyTypeId: {
          return _Empty
        }
        case SliceTypeId: {
          return new Slice(self.chunk, self.offset + n, self.length - n)
        }
        case SingletonTypeId: {
          if (n > 0) {
            return _Empty
          }
          return self
        }
        default: {
          return new Slice(self, n, len - n)
        }
      }
    }
  }
}
