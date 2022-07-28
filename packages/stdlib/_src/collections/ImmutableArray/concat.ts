/**
 * @tsplus pipeable-operator ImmutableArray &
 * @tsplus static ImmutableArray.Aspects concat
 * @tsplus pipeable ImmutableArray concat
 */
export function concat<B>(that: ImmutableArray<B>) {
  return <A>(self: ImmutableArray<A>): ImmutableArray<A | B> => new ImmutableArray([...self.array, ...that.array])
}

/**
 * Concatenates two ImmutableArray together
 *
 * @tsplus pipeable-operator ImmutableArray +
 */
export function concatOperator<A>(that: ImmutableArray<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => self.concat(that)
}
