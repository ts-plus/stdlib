/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 *
 * @tsplus pipeable-operator ParSeq >
 * @tsplus static ParSeq.Aspects zipRight
 * @tsplus pipeable ParSeq zipRight
 */
export function zipRight<B>(that: ParSeq<B>) {
  return <A>(self: ParSeq<A>): ParSeq<B> => self.zipWith(that, (_, b) => b)
}
