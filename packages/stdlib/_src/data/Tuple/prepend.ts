import type { Tuple } from "@tsplus/stdlib/data/Tuple/definition";
import { TupleInternal } from "@tsplus/stdlib/data/Tuple/definition";

/**
 * Prepends a value to a tuple.
 *
 * @tsplus fluent tsplus/Tuple prepend
 */
export function prepend<Ks extends unknown[], K>(
  self: Tuple<Ks>,
  k: K
): Tuple<[K, ...Ks]> {
  return new TupleInternal([k, ...self.tuple]);
}
