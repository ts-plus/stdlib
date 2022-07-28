/**
 * @tsplus static NonEmptyImmutableArray.Aspects map
 * @tsplus pipeable NonEmptyImmutableArray map
 */
export function map<A, B>(f: (a: A, i: number) => B) {
  return (self: NonEmptyImmutableArray<A>): NonEmptyImmutableArray<B> =>
    new ImmutableArray(self.array.map((a, i) => f(a, i)) as any) as NonEmptyImmutableArray<B>
}
