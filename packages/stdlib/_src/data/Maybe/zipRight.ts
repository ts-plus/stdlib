/**
 * Apply both and return second.
 *
 * @tsplus pipeable-operator Maybe >
 * @tsplus static Maybe.Aspects zipRight
 * @tsplus pipeable Maybe zipRight
 */
export function zipRight<B>(that: Maybe<B>) {
  return <A>(self: Maybe<A>): Maybe<B> => self.flatMap(() => that)
}
