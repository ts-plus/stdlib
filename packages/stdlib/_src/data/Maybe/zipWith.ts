/**
 * Zips `Maybe<A>` and `Maybe<B>` into `Maybe<C>` using the provided zipper.
 *
 * @tsplus static Maybe.Aspects zipWith
 * @tsplus pipeable Maybe zipWith
 */
export function zipWith<A, B, C>(that: Maybe<B>, f: (a: A, b: B) => C) {
  return (self: Maybe<A>): Maybe<C> => self.flatMap((a) => that.map((b) => f(a, b)))
}
