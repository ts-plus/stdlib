/**
 * @tsplus static ImmutableArray.Aspects map
 * @tsplus pipeable ImmutableArray map
 */
export function map<A, B>(f: (a: A, k: number) => B) {
  return (self: ImmutableArray<A>): ImmutableArray<B> => new ImmutableArray(self.array.map((a, i) => f(a, i)))
}
