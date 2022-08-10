/**
 * @tsplus pipeable-index ImmutableArray
 * @tsplus static ImmutableArray.Aspects get
 * @tsplus pipeable ImmutableArray get
 */
export function get(index: number) {
  return <A>(self: ImmutableArray<A>): Maybe<NonNullable<A>> =>
    Maybe.fromNullable(self.array[index])
}
