/**
 * Creates an array of unique values that are included in all given arrays using
 * an `Equivalence<A>` for equality comparisons. The order and references of
 * result values are determined by the first array.
 *
 * @tsplus fluent Chunk intersection
 */
export function intersection_<A>(
  self: Chunk<A>,
  E: Equivalence<A>,
  that: Chunk<A>
): Chunk<A> {
  return self.filter((a) => that.elem(E, a))
}

/**
 * Creates an array of unique values that are included in all given arrays using
 * an `Equivalence<A>` for equality comparisons. The order and references of
 * result values are determined by the first array.
 *
 * @tsplus static Chunk/Aspects intersection
 */
export const intersection = Pipeable(intersection_)
