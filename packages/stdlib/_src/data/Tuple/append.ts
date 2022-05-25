/**
 * Appends a value to a tuple.
 *
 * @tsplus fluent tsplus/Tuple append
 */
export function append<Ks extends unknown[], K>(
  self: Tuple<Ks>,
  k: K
): Tuple<[...Ks, K]> {
  return new Tuple([...self.tuple, k])
}
