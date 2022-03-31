import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Returns the number of elements in the chunk.
 *
 * @tsplus getter Chunk size
 */
export function size<A>(self: Chunk<A>) {
  return concreteChunkId(self).length;
}
