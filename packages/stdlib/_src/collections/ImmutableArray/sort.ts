/**
 * Sort the elements of an `ImmutableArray` in increasing order.
 *
 * @tsplus static ImmutableArray.Aspects sort
 * @tsplus pipeable ImmutableArray sort
 */
export function sort<A>(O: Ord<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => new ImmutableArray([...self].sort((x, y) => O.compare(x, y)))
}
