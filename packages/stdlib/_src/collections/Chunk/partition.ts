/**
 * Separate elements based on a predicate.
 *
 * @tsplus static Chunk.Aspects partition
 * @tsplus pipeable Chunk partition
 */
export function partition<A>(f: Predicate<A>) {
  return (self: Chunk<A>): Tuple<[Chunk<A>, Chunk<A>]> => self.partitionWithIndex((_, a: A) => f(a))
}
