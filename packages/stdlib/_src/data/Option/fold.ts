/**
 * Takes a default value, a function, and an `Option` value, if the `Option`
 * value is `None` the default value is returned, otherwise the function is
 * applied to the value inside the `Some` and the result is returned.
 *
 * @tsplus fluent Option fold
 */
export function fold_<A, B, C>(
  ma: Option<A>,
  onNone: LazyArg<B>,
  onSome: (a: A) => C
): B | C {
  return ma.isNone() ? onNone() : onSome(ma.value);
}

/**
 * @tsplus static Option/Aspects fold
 */
export const fold = Pipeable(fold_);
