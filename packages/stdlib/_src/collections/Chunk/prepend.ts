import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Prepends a value to a chunk.
 *
 * @tsplus fluent Chunk prepend
 */
export function prepend_<A, A1>(self: Chunk<A>, a: A1): Chunk<A | A1> {
  return concreteChunkId(self)._prepend(a);
}

/**
 * Prepends a value to a chunk.
 *
 * @tsplus static Chunk/Aspects prepend
 */
export const prepend = Pipeable(prepend_);
