import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Unsafely retrieve a value from a `Chunk`.
 *
 * @tsplus fluent Chunk unsafeGet
 */
export function unsafeGet_<A>(self: Chunk<A>, n: number): A {
  return concreteChunkId(self)._get(n)
}

/**
 * Unsafely retrieve a value from a `Chunk`.
 *
 * @tsplus static Chunk/Aspects unsafeGet
 */
export const unsafeGet = Pipeable(unsafeGet_)
