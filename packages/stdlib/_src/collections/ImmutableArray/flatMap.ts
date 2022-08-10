/**
 * @tsplus static ImmutableArray.Aspects flatMap
 * @tsplus pipeable ImmutableArray flatMap
 */
export function flatMap<A, B>(f: (a: A) => ImmutableArray<B>) {
  return (self: ImmutableArray<A>): ImmutableArray<B> =>
    new ImmutableArray(self.array.flatMap(x => f(x).array))
}
