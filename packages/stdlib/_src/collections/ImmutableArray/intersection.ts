/**
 * Creates an `ImmutableArray<A>` of unique values that are included in the
 * given arrays using the specified `Equivalence` for equality comparisons.
 * The order and references of result values are determined by the first array.
 *
 * @tsplus fluent ImmutableArray intersection
 */
export function intersection_<A>(self: ImmutableArray<A>, E: Equivalence<A>) {
  const elem = ImmutableArray.$.elem(E)
  return (that: ImmutableArray<A>): ImmutableArray<A> => self.filter(elem(that))
}

/**
 * Creates an `ImmutableArray<A>` of unique values that are included in the
 * given arrays using the specified `Equivalence` for equality comparisons.
 * The order and references of result values are determined by the first array.
 *
 * @tsplus static ImmutableArray/Aspect intersection
 */
export const intersection = Pipeable(intersection_)
