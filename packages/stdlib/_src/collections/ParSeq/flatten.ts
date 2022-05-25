/**
 * Flattens a collection of collections of events into a single collection
 * of events.
 *
 * @tsplus fluent ParSeq flatten
 */
export function flatten<A>(self: ParSeq<ParSeq<A>>): ParSeq<A> {
  return self.flatMap(identity)
}
