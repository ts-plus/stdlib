/**
 * Filter values from the `ImmutableArray`.
 *
 * @tsplus static ImmutableArray.Aspects filter
 * @tsplus pipeable ImmutableArray filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: ImmutableArray<A>) => ImmutableArray<B>
export function filter<A>(f: Predicate<A>): (self: ImmutableArray<A>) => ImmutableArray<A>
export function filter<A>(f: Predicate<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => new ImmutableArray(self.array.filter((a) => f(a)))
}
