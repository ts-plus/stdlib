/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 *
 * @tsplus fluent ParSeq zip
 */
export function zip_<A, B>(self: ParSeq<A>, that: ParSeq<B>): ParSeq<Tuple<[A, B]>> {
  return self.zipWith(that, (a, b) => Tuple(a, b))
}

/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 *
 * @tsplus static ParSeq/Aspects zip
 */
export const zip = Pipeable(zip_)
