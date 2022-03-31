import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Converts a chunk to an `ArrayLike` (either `Array` or `Buffer`).
 *
 * @tsplus fluent Chunk asArrayLike
 */
export function asArrayLike<A>(self: Chunk<A>): ArrayLike<A> {
  return concreteChunkId(self)._arrayLike();
}
