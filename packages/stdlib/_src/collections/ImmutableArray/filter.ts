/**
 * Filter values from the `ImmutableArray`.
 *
 * @tsplus fluent ImmutableArray filter
 */
export function filter_<A, B extends A>(self: ImmutableArray<A>, f: Refinement<A, B>): ImmutableArray<B>;
export function filter_<A>(self: ImmutableArray<A>, f: Predicate<A>): ImmutableArray<A>;
export function filter_<A>(self: ImmutableArray<A>, f: Predicate<A>): ImmutableArray<A> {
  return new ImmutableArray(self.array.filter((a) => f(a)));
}

/**
 * Filter values from the `ImmutableArray`.
 *
 * @tsplus static ImmutableArray/Aspects filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: ImmutableArray<A>) => ImmutableArray<B>;
export function filter<A>(f: Predicate<A>): (self: ImmutableArray<A>) => ImmutableArray<A>;
export function filter<A>(f: Predicate<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => self.filter(f);
}
