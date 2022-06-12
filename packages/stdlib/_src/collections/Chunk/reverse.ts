import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Reverse buckets iterator.
 *
 * @tsplus getter Chunk reverse
 */
export function reverse<A>(self: Chunk<A>): Iterable<A> {
  return concreteChunkId(self)._reverse()
}
