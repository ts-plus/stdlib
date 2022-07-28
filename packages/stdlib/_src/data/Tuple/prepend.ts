/**
 * Prepends a value to a tuple.
 *
 * @tsplus static Tuple.Aspects prepend
 * @tsplus pipeable Tuple prepend
 */
export function prepend<K>(k: K) {
  return <Ks extends unknown[]>(self: Tuple<Ks>): Tuple<[K, ...Ks]> => new Tuple([k, ...self.tuple])
}
