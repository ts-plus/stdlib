/**
 * @tsplus pipeable-operator Maybe |
 * @tsplus static Maybe.Aspects orElse
 * @tsplus pipeable Maybe orElse
 */
export function orElse<B>(onNone: LazyArg<Maybe<B>>) {
  return <A>(self: Maybe<A>): Maybe<A | B> => self.isNone() ? onNone() : self
}
