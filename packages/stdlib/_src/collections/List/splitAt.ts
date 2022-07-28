/**
 * Returns two splits of this list at the specified index.
 *
 * @tsplus static List.Aspects splitAt
 * @tsplus pipeable List splitAt
 */
export function splitAt(n: number) {
  return <A>(self: List<A>): Tuple<[List<A>, List<A>]> => Tuple(self.take(n).toList, self.drop(n))
}
