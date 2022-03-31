/**
 * Returns the first index for which the given predicate is satisfied.
 *
 * @tsplus fluent Chunk indexWhere
 */
export function indexWhere_<A>(self: Chunk<A>, f: Predicate<A>): number {
  return self.indexWhereFrom(0, f);
}

/**
 * Returns the first index for which the given predicate is satisfied.
 *
 * @tsplus static Chunk/Aspects indexWhere
 */
export const indexWhere = Pipeable(indexWhere_);
