/**
 * Creates an `ImmutableArray<A>` of unique values, in order, from the given
 * arrays using the specified `Equivalence<A>` for equality comparisons.
 *
 * @tsplus static ImmutableArray.Aspects union
 * @tsplus pipeable ImmutableArray union
 */
export function union<A>(E: Equivalence<A>, that: ImmutableArray<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> =>
    self.concat(that.filter((a) => !self.elem(E, a)))
}
