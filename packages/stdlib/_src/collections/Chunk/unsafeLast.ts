import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns the last element of this chunk. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `last` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the last element of the chunk.
 *
 * @tsplus getter Chunk unsafeLast
 */
export function unsafeLast<A>(self: Chunk<A>): A {
  return concreteChunkId(self)._get(concreteChunkId(self).length - 1)
}
