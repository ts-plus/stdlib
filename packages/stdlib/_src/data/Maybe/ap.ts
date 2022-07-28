/**
 * Classic applicative.
 *
 * @tsplus static Maybe.Aspects ap
 * @tsplus pipeable Maybe ap
 */
export function ap<A, B>(that: Maybe<A>) {
  return (self: Maybe<(a: A) => B>): Maybe<B> =>
    self.isNone() ?
      Maybe.none :
      that.isNone() ?
      Maybe.none :
      Maybe.some(self.value(that.value))
}
