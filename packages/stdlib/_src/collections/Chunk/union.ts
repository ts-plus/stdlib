/**
 * Creates an array of unique values, in order, from all given arrays using an
 * `Equivalence<A>` for equality comparisons.
 *
 * @tsplus fluent Chunk union
 */
export function union_<A>(
  self: Chunk<A>,
  E: Equivalence<A>,
  that: Chunk<A>
): Chunk<A> {
  return self + that.filter((a) => !self.elem(E, a));
}

/**
 * Creates an array of unique values, in order, from all given arrays using an
 * `Equivalence<A>` for equality comparisons.
 *
 * @tsplus static Chunk/Aspects union
 */
export const union = Pipeable(union_);
