/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 *
 * @tsplus pipeable-operator ParSeq <
 * @tsplus static ParSeq.Aspects zipLeft
 * @tsplus pipeable ParSeq zipLeft
 */
export function zipLeft<B>(that: ParSeq<B>) {
  return <A>(self: ParSeq<A>): ParSeq<A> => self.zipWith(that, (a, _) => a)
}
