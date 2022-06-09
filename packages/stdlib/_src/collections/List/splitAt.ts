/**
 * Returns two splits of this list at the specified index.
 *
 * @tsplus fluent List splitAt
 */
export function splitAt_<A>(self: List<A>, n: number): Tuple<[List<A>, List<A>]> {
  return Tuple(self.take(n).asList(), self.drop(n))
}

/**
 * Returns two splits of this list at the specified index.
 *
 * @tsplus static List/Aspects splitAt
 */
export const splitAt = Pipeable(splitAt_)
