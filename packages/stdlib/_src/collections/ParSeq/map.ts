/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 *
 * @tsplus fluent ParSeq map
 */
export function map_<A, B>(self: ParSeq<A>, f: (a: A) => B): ParSeq<B> {
  return self.flatMap((a) => ParSeq.single(f(a)));
}

/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 *
 * @tsplus static ParSeq/Aspects map
 */
export const map = Pipeable(map_);
