import { _Empty } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Builds an empty chunk.
 *
 * @tsplus static Chunk/Ops empty
 */
export function empty<A>(): Chunk<A> {
  return _Empty;
}
