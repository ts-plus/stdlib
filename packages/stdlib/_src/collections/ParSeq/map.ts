/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 *
 * @tsplus static ParSeq.Aspects map
 * @tsplus pipeable ParSeq map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: ParSeq<A>): ParSeq<B> => self.flatMap((a) => ParSeq.single(f(a)))
}
