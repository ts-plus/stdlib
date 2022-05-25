import { concreteChunk, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @tsplus fluent Chunk flatMap
 */
export function flatMap_<A, B>(self: Chunk<A>, f: (a: A) => Chunk<B>): Chunk<B> {
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

/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @tsplus static Chunk/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
