/**
 * Zips `Maybe<A>` and `Maybe<B>` into `Maybe<Tuple<[A, B]>>`.
 *
 * @tsplus pipeable-operator Maybe +
 * @tsplus static Maybe.Aspects zip
 * @tsplus pipeable Maybe zip
 */
export function zip<B>(that: Maybe<B>) {
  return <A>(self: Maybe<A>): Maybe<Tuple<[A, B]>> => self.flatMap((a) => that.map((b) => Tuple(a, b)))
}
