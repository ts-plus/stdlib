/**
 * Takes a default value, a function, and an `Maybe` value, if the `Maybe`
 * value is `None` the default value is returned, otherwise the function is
 * applied to the value inside the `Some` and the result is returned.
 *
 * @tsplus fluent Maybe fold
 */
export function fold_<A, B, C>(
  ma: Maybe<A>,
  onNone: LazyArg<B>,
  onSome: (a: A) => C
): B | C {
  return ma.isNone() ? onNone() : onSome(ma.value)
}

/**
 * @tsplus static Maybe/Aspects fold
 */
export const fold = Pipeable(fold_)
