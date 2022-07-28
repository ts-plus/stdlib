/**
 * Appends a value to a tuple.
 *
 * @tsplus static Tuple.Aspects append
 * @tsplus pipeable Tuple append
 */
export function append<K>(k: K) {
  return <Ks extends unknown[]>(self: Tuple<Ks>): Tuple<[...Ks, K]> => new Tuple([...self.tuple, k])
}
