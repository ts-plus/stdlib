/**
 * Creates an `ImmutableArray<A>` of values not included in that
 * `ImmutableArray<A>` using an `Equivalence<A>` for equality comparisons. The
 * order and references of result values are determined by the first array.
 *
 * @tsplus static ImmutableArray.Aspects difference
 * @tsplus pipeable ImmutableArray difference
 */
export function difference<A>(E: Equivalence<A>, that: ImmutableArray<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => self.filter((a) => !that.elem(E, a))
}
