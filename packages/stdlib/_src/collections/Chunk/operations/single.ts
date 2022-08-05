import { Singleton } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Builds a chunk of a single value.
 *
 * @tsplus static Chunk.Ops single
 */
export function single<A>(a: A): Chunk<A> {
  return new Singleton(a)
}
