/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 *
 * @tsplus operator ParSeq <
 * @tsplus fluent ParSeq zipLeft
 */
export function zipLeft_<A, B>(self: ParSeq<A>, that: ParSeq<B>): ParSeq<A> {
  return self.zipWith(that, (a, _) => a)
}

/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 *
 * @tsplus static ParSeq/Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
