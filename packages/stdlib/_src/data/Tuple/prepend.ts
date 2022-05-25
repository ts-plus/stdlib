/**
 * Prepends a value to a tuple.
 *
 * @tsplus fluent tsplus/Tuple prepend
 */
export function prepend<Ks extends unknown[], K>(
  self: Tuple<Ks>,
  k: K
): Tuple<[K, ...Ks]> {
  return new Tuple([k, ...self.tuple])
}
