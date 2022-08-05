import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Unsafely retrieve a value from a `Chunk`.
 *
 * @tsplus static Chunk.Aspects unsafeGet
 * @tsplus pipeable Chunk unsafeGet
 */
export function unsafeGet(n: number) {
  return <A>(self: Chunk<A>): A => concreteChunkId(self)._get(n)
}
