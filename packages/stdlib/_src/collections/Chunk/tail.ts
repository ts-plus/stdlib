import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns every elements after the first.
 *
 * @tsplus getter Chunk tail
 */
export function tail<A>(self: Chunk<A>): Option<Chunk<A>> {
  return concreteChunkId(self).length > 0 ? Option.some(self.drop(1)) : Option.none
}
