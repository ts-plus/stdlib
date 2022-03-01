import type { Tuple } from "./definition.js"
import { TupleInternal } from "./definition.js"

/**
 * Concatenates two tuples.
 *
 * @tsplus operator tsplus/Tuple +
 * @tsplus fluent tsplus/Tuple concat
 */
export function concat<Ks extends unknown[], Hs extends unknown[]>(
  self: Tuple<Ks>,
  that: Tuple<Hs>
): Tuple<[...Ks, ...Hs]> {
  return new TupleInternal([...self.tuple, ...that.tuple])
}
