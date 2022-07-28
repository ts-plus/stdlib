/**
 * @tsplus static SortedSet.Ops __call
 * @tsplus static SortedSet.Ops make
 */
export function make<A>(
  ord: Ord<A>
): (...entries: Array<A>) => SortedSet<A> {
  return (...entries: Array<A>) => SortedSet.from(ord)(entries)
}
