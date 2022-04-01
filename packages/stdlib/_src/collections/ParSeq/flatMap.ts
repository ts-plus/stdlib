/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 *
 * @tsplus fluent ParSeq flatMap
 */
export function flatMap_<A, B>(self: ParSeq<A>, f: (a: A) => ParSeq<B>): ParSeq<B> {
  return self.fold(ParSeq.empty(), f, ParSeq.combineSeq, ParSeq.combinePar);
}

/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 *
 * @tsplus static ParSeq/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_);
