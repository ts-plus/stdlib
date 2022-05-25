import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns every elements after the first. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 *
 * @tsplus fluent Chunk unsafeTail
 */
export function unsafeTail<A>(self: Chunk<A>): Chunk<A> {
  if (concreteChunkId(self).length === 0) {
    throw new IndexOutOfBounds(1, 1, self.length - 1)
  }
  return self.drop(1)
}
