/**
 * Construct `Either<E, A>` from `Option<A>` constructing `E` with `onNone`.
 *
 * @tsplus static Either/Ops fromOption
 */
export function fromOption<A, E>(option: Option<A>, onNone: LazyArg<E>): Either<E, A> {
  return option.isNone() ? Either.left(onNone()) : Either.right(option.value)
}
