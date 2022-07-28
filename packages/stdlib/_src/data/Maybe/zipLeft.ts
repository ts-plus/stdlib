/**
 * Apply both and return first.
 *
 * @tsplus pipeable-operator Maybe <
 * @tsplus static Maybe.Aspects zipLeft
 * @tsplus pipeable Maybe zipLeft
 */
export function zipLeft<B>(that: Maybe<B>) {
  return <A>(self: Maybe<A>): Maybe<A> => self.flatMap((a) => that.map(() => a))
}
