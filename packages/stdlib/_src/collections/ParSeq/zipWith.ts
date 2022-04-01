/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 *
 * @tsplus fluent ParSeq zipWith
 */
export function zipWith_<A, B, C>(
  self: ParSeq<A>,
  that: ParSeq<B>,
  f: (a: A, b: B) => C
): ParSeq<C> {
  return self.flatMap((a) => that.map((b) => f(a, b)));
}

/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 *
 * @tsplus static ParSeq/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_);
