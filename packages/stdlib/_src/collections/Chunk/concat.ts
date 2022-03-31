import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Concatenates two chunks.
 *
 * @tsplus operator Chunk +
 * @tsplus fluent Chunk concat
 */
export function concat_<A, A1>(self: Chunk<A>, that: Chunk<A1>): Chunk<A | A1> {
  return concreteChunkId(self)._concat(concreteChunkId(that));
}

/**
 * Concats chunks
 *
 * @tsplus static Chunk/Aspects concat
 */
export const concat = Pipeable(concat_);
