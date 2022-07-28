/**
 * Takes a default value, a function, and an `Maybe` value, if the `Maybe`
 * value is `None` the default value is returned, otherwise the function is
 * applied to the value inside the `Some` and the result is returned.
 *
 * @tsplus static Maybe.Aspects fold
 * @tsplus pipeable Maybe fold
 */
export function fold<A, B, C>(onNone: LazyArg<B>, onSome: (a: A) => C) {
  return (self: Maybe<A>): B | C => self.isNone() ? onNone() : onSome(self.value)
}
