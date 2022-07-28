/**
 * @tsplus static NonEmptyImmutableArray.Aspects flatMap
 * @tsplus pipeable NonEmptyImmutableArray flatMap
 */
export function flatMap<A, B>(f: (a: A) => NonEmptyImmutableArray<B>) {
  return (self: NonEmptyImmutableArray<A>): NonEmptyImmutableArray<B> =>
    new ImmutableArray(self.array.flatMap(x => f(x).array) as any) as NonEmptyImmutableArray<B>
}
