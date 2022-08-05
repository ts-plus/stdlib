import { Chunk, concreteChunk, Singleton, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @tsplus static Chunk.Aspects mapWithIndex
 * @tsplus pipeable Chunk mapWithIndex
 */
export function mapWithIndex<A, B>(f: (index: number, a: A) => B) {
  return (self: Chunk<A>): Chunk<B> => {
    concreteChunk(self)

    if (self._typeId === SingletonTypeId) {
      return new Singleton(f(0, self.a))
    }

    let r = Chunk.empty<B>()
    let i = 0
    for (const k of self) {
      r = r.append(f(i, k))
      i += 1
    }
    return r
  }
}
