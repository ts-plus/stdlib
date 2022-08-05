import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Takes the first `n` elements.
 *
 * @tsplus static Chunk.Aspects take
 * @tsplus pipeable Chunk take
 */
export function take(n: number) {
  return <A>(self: Chunk<A>): Chunk<A> => concreteChunkId(self)._take(n)
}
