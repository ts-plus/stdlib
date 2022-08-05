import { concreteChunk, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @tsplus static Chunk.Aspects flatMap
 * @tsplus pipeable Chunk flatMap
 */
export function flatMap<A, B>(f: (a: A) => Chunk<B>) {
  return (self: Chunk<A>): Chunk<B> => {
    concreteChunk(self)

    if (self._typeId === SingletonTypeId) {
      return f(self.a)
    }

    let r = Chunk.empty<B>()
    for (const k of self) {
      r = r.concat(f(k))
    }
    return r
  }
}
