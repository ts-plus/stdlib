import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Concatenates two chunks.
 *
 * @tsplus pipeable-operator Chunk +
 * @tsplus static Chunk.Aspects concat
 * @tsplus pipeable Chunk concat
 */
export function concat<A, A1>(that: Chunk<A1>) {
  return (self: Chunk<A>): Chunk<A | A1> => concreteChunkId(self)._concat(concreteChunkId(that))
}
