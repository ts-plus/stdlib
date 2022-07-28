import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Prepends a value to a chunk.
 *
 * @tsplus static Chunk.Aspects prepend
 * @tsplus pipeable Chunk prepend
 */
export function prepend<A1>(a: A1) {
  return <A>(self: Chunk<A>): Chunk<A | A1> => concreteChunkId(self)._prepend(a)
}
