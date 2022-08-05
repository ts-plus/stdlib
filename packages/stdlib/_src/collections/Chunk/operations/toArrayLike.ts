import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Converts a chunk to an `ArrayLike` (either `Array` or `Buffer`).
 *
 * @tsplus getter Chunk toArrayLike
 */
export function toArrayLike<A>(self: Chunk<A>): ArrayLike<A> {
  return concreteChunkId(self)._arrayLike()
}
