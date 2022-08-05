import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Materializes a chunk into a chunk backed by an array. This method can
 * improve the performance of bulk operations.
 *
 * @tsplus getter Chunk materialize
 */
export function materialize<A>(self: Chunk<A>): Chunk<A> {
  return concreteChunkId(self)._materialize()
}
