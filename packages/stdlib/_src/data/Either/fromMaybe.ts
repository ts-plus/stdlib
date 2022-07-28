/**
 * Construct `Either<E, A>` from `Maybe<A>` constructing `E` with `onNone`.
 *
 * @tsplus static Either.Ops fromMaybe
 */
export function fromMaybe<A, E>(maybe: Maybe<A>, onNone: LazyArg<E>): Either<E, A> {
  return maybe.isNone() ? Either.left(onNone()) : Either.right(maybe.value)
}
