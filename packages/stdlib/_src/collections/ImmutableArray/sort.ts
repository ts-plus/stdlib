/**
 * Sort the elements of an `ImmutableArray` in increasing order.
 *
 * @tsplus fluent ImmutableArray sort
 */
export function sort_<A>(self: ImmutableArray<A>, O: Ord<A>): ImmutableArray<A> {
  return new ImmutableArray([...self].sort((x, y) => O.compare(x, y)));
}

/**
 * Sort the elements of an `ImmutableArray` in increasing order.
 *
 * @tsplus static ImmutableArray/Aspects sort
 */
export const sort = Pipeable(sort_);
