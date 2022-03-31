import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Buckets iterator.
 *
 * @tsplus getter Chunk buckets
 */
export function buckets<A>(self: Chunk<A>): Iterable<ArrayLike<A>> {
  return concreteChunkId(self)._buckets();
}
