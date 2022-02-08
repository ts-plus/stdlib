import type { Tuple } from "./definition.js"
import { TupleInternal } from "./definition.js"

/**
 * Prepends a value to a tuple.
 *
 * @tsplus fluent tsplus/Tuple prepend
 */
export function prepend<Ks extends unknown[], K>(
  self: Tuple<Ks>,
  k: K
): Tuple<[K, ...Ks]> {
  return new TupleInternal([k, ...self.tuple])
}
