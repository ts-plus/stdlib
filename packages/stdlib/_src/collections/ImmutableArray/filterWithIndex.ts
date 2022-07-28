/**
 * Filter values from the `ImmutableArray`.
 *
 * @tsplus static ImmutableArray.Aspects filterWithIndex
 * @tsplus pipeable ImmutableArray filterWithIndex
 */
export function filterWithIndex<A, B extends A>(
  f: (i: number, a: A) => a is B
): (self: ImmutableArray<A>) => ImmutableArray<B>
export function filterWithIndex<A>(f: (i: number, a: A) => boolean): (self: ImmutableArray<A>) => ImmutableArray<A>
export function filterWithIndex<A>(f: (i: number, a: A) => boolean) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => new ImmutableArray(self.array.filter((a, i) => f(i, a)))
}
