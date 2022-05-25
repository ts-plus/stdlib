import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Appends a value to a chunk.
 *
 * @tsplus fluent Chunk append
 */
export function append_<A, A1>(self: Chunk<A>, a: A1): Chunk<A | A1> {
  return concreteChunkId(self)._append(a)
}

/**
 * Appends a value to a chunk.
 *
 * @tsplus static Chunk/Aspects append
 */
export const append = Pipeable(append_)
