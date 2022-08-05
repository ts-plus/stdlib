/**
 * Returns the first index for which the given predicate is satisfied.
 *
 * @tsplus static Chunk.Aspects indexWhere
 * @tsplus pipeable Chunk indexWhere
 */
export function indexWhere<A>(f: Predicate<A>) {
  return (self: Chunk<A>): number => self.indexWhereFrom(0, f)
}
