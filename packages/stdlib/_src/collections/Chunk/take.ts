import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Takes the first `n` elements.
 *
 * @tsplus fluent Chunk take
 */
export function take_<A>(self: Chunk<A>, n: number): Chunk<A> {
  return concreteChunkId(self)._take(n)
}

/**
 * Takes the first `n` elements.
 *
 * @tsplus static Chunk/Aspects take
 */
export const take = Pipeable(take_)
