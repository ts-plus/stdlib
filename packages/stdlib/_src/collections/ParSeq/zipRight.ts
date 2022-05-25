/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 *
 * @tsplus operator ParSeq >
 * @tsplus fluent ParSeq zipRight
 */
export function zipRight_<A, B>(self: ParSeq<A>, that: ParSeq<B>): ParSeq<B> {
  return self.zipWith(that, (_, b) => b)
}

/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 *
 * @tsplus static ParSeq/Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_)
