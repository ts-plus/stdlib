/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 *
 * @tsplus static ParSeq.Aspects zip
 * @tsplus pipeable ParSeq zip
 */
export function zip<B>(that: ParSeq<B>) {
  return <A>(self: ParSeq<A>): ParSeq<readonly [A, B]> => self.zipWith(that, (a, b) => [a, b])
}
