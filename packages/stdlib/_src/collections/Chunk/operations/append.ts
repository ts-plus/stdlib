import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Appends a value to a chunk.
 *
 * @tsplus static Chunk.Aspects append
 * @tsplus pipeable Chunk append
 */
export function append<A1>(a: A1) {
  return <A>(self: Chunk<A>): Chunk<A | A1> => concreteChunkId(self)._append(a)
}
