/**
 * Concatenates two tuples.
 *
 * @tsplus pipeable-operator Tuple +
 * @tsplus static Tuple.Aspects concat
 * @tsplus pipeable Tuple concat
 */
export function concat<Hs extends unknown[]>(that: Tuple<Hs>) {
  return <Ks extends unknown[]>(self: Tuple<Ks>): Tuple<[...Ks, ...Hs]> =>
    new Tuple(
      [...self.tuple, ...that.tuple]
    )
}
