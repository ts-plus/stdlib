/**
 * Filter values from the `ImmutableArray`.
 *
 * @tsplus fluent ImmutableArray filterWithIndex
 */
export function filterWithIndex_<A, B extends A>(
  self: ImmutableArray<A>,
  f: (i: number, a: A) => a is B
): ImmutableArray<B>;
export function filterWithIndex_<A>(self: ImmutableArray<A>, f: (i: number, a: A) => boolean): ImmutableArray<A>;
export function filterWithIndex_<A>(self: ImmutableArray<A>, f: (i: number, a: A) => boolean): ImmutableArray<A> {
  return new ImmutableArray(self.array.filter((a, i) => f(i, a)));
}

/**
 * Filter values from the `ImmutableArray`.
 *
 * @tsplus static ImmutableArray/Aspects filterWithIndex
 */
export function filterWithIndex<A, B extends A>(
  f: (i: number, a: A) => a is B
): (self: ImmutableArray<A>) => ImmutableArray<B>;
export function filterWithIndex<A>(f: (i: number, a: A) => boolean): (self: ImmutableArray<A>) => ImmutableArray<A>;
export function filterWithIndex<A>(f: (i: number, a: A) => boolean) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => self.filterWithIndex(f);
}
