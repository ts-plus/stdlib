/**
 * @tsplus derive SortedSet<_> 10
 */
export function deriveSortedSet<A>(
  ...[ord]: [Ord<A>]
): SortedSet<A> {
  return SortedSet.make(ord)
}
