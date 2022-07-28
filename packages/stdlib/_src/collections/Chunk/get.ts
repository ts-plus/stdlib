import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Safely retrieve a value from a `Chunk`.
 *
 * @tsplus pipeable-index Chunk
 * @tsplus static Chunk.Aspects get
 * @tsplus pipeable Chunk get
 */
export function get(n: number) {
  return <A>(self: Chunk<A>): Maybe<A> => {
    return !Number.isInteger(n) || n < 0 || n >= concreteChunkId(self).length
      ? Maybe.none
      : Maybe.some(concreteChunkId(self)._get(n))
  }
}
