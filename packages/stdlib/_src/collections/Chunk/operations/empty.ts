import { _Empty } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Builds an empty chunk.
 *
 * @tsplus static Chunk.Ops empty
 */
export function empty<A = never>(): Chunk<A> {
  return _Empty
}
