import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Determines if the chunk is empty.
 *
 * @tsplus fluent Chunk isNonEmpty
 */
export function isNonEmpty<A>(self: Chunk<A>): boolean {
  return concreteChunkId(self).length !== 0
}
