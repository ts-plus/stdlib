/**
 * Creates an array of array values not included in the other given array using
 * an `Equivalence<A>` for equality comparisons. The order and references of
 * result values are determined by the first array.
 *
 * @tsplus fluent Chunk difference
 */
export function difference_<A>(
  self: Chunk<A>,
  E: Equivalence<A>,
  that: Chunk<A>
): Chunk<A> {
  return self.filter((a) => !that.elem(E, a));
}

/**
 * Creates an array of array values not included in the other given array using
 * an `Equivalence<A>` for equality comparisons. The order and references of
 * result values are determined by the first array.
 *
 * @tsplus static Chunk/Aspects difference
 */
export const difference = Pipeable(difference_);
