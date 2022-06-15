import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Determines if the chunk is empty.
 *
 * @tsplus getter Chunk isEmpty
 */
export function isEmpty<A>(self: Chunk<A>): boolean {
  return concreteChunkId(self).length === 0
}
