/**
 * Creates an `ImmutableArray<A>` of unique values, in order, from the given
 * arrays using the specified `Equivalence<A>` for equality comparisons.
 *
 * @tsplus fluent ImmutableArray union
 */
export function union_<A>(self: ImmutableArray<A>, E: Equivalence<A>) {
  const elem = self.elem(E)
  return (that: ImmutableArray<A>): ImmutableArray<A> => self + that.filter((a) => !elem(a))
}

/**
 * Creates an `ImmutableArray<A>` of unique values, in order, from the given
 * arrays using the specified `Equivalence<A>` for equality comparisons.
 *
 * @tsplus static ImmutableArray/Aspects union
 */
export const union = Pipeable(union_)
