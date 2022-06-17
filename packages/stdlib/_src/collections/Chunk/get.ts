import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Safely retrieve a value from a `Chunk`.
 *
 * @tsplus fluent Chunk get
 * @tsplus index Chunk
 */
export function get_<A>(self: Chunk<A>, n: number): Maybe<A> {
  return !Number.isInteger(n) || n < 0 || n >= concreteChunkId(self).length
    ? Maybe.none
    : Maybe.some(concreteChunkId(self)._get(n))
}

/**
 * Safely retrieve a value from a `Chunk`.
 *
 * @tsplus static Chunk/Aspects get
 */
export const get = Pipeable(get_)
