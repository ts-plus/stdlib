/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 *
 * @tsplus static ParSeq.Aspects zipWith
 * @tsplus pipeable ParSeq zipWith
 */
export function zipWith<A, B, C>(that: ParSeq<B>, f: (a: A, b: B) => C) {
  return (self: ParSeq<A>): ParSeq<C> => self.flatMap((a) => that.map((b) => f(a, b)))
}
