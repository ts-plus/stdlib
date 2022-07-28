/**
 * Creates an `ImmutableArray<A>` of unique values that are included in the
 * given arrays using the specified `Equivalence` for equality comparisons.
 * The order and references of result values are determined by the first array.
 *
 * @tsplus static ImmutableArray.Aspects intersection
 * @tsplus pipeable ImmutableArray intersection
 */
export function intersection<A>(E: Equivalence<A>, that: ImmutableArray<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => self.filter((a) => that.elem(E, a))
}
