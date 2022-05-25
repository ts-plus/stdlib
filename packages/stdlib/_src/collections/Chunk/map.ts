import { Chunk, concreteChunk, Singleton, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @tsplus fluent Chunk map
 */
export function map_<A, B>(self: Chunk<A>, f: (a: A) => B): Chunk<B> {
  concreteChunk(self)

  if (self._typeId === SingletonTypeId) {
    return new Singleton(f(self.a))
  }

  let r = Chunk.empty<B>()
  for (const k of self) {
    r = r.append(f(k))
  }
  return r
}

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @tsplus static Chunk/Aspects map
 */
export const map = Pipeable(map_)
