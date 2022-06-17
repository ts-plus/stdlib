import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns the last element of this chunk if it exists.
 *
 * @tsplus getter Chunk last
 */
export function last<A>(self: Chunk<A>): Maybe<A> {
  return self.get(concreteChunkId(self).length - 1)
}
