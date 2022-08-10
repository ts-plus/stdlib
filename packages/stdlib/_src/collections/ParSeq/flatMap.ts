/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 *
 * @tsplus static ParSeq.Aspects flatMap
 * @tsplus pipeable ParSeq flatMap
 */
export function flatMap<A, B>(f: (a: A) => ParSeq<B>) {
  return (self: ParSeq<A>): ParSeq<B> =>
    self.fold(ParSeq.empty(), f, ParSeq.combineSeq, ParSeq.combinePar)
}
