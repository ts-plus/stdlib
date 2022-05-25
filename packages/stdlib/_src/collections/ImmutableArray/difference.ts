import { not } from "@tsplus/stdlib/data/Predicate"

/**
 * Creates an `ImmutableArray<A>` of values not included in that
 * `ImmutableArray<A>` using an `Equivalence<A>` for equality comparisons. The
 * order and references of result values are determined by the first array.
 *
 * @tsplus fluent ImmutableArray difference
 */
export function difference_<A>(self: ImmutableArray<A>, E: Equivalence<A>) {
  const elem = ImmutableArray.$.elem(E)
  return (that: ImmutableArray<A>): ImmutableArray<A> => self.filter(not(elem(that)))
}

/**
 * Creates an `ImmutableArray<A>` of values not included in that
 * `ImmutableArray<A>` using an `Equivalence<A>` for equality comparisons. The
 * order and references of result values are determined by the first array.
 *
 * @tsplus static ImmutableArray/Aspects difference
 */
export const difference = Pipeable(difference_)
