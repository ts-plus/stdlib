import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Reverse buckets iterator.
 *
 * @tsplus getter Chunk reverseBuckets
 */
export function reverseBuckets<A>(self: Chunk<A>): Iterable<ArrayLike<A>> {
  return concreteChunkId(self)._reverseBuckets()
}
