/**
 * Executes the specified `Either` if it is a `Right`, otherwise executes
 * `orElse`.
 *
 * @tsplus pipeable-operator Either |
 * @tsplus static Either.Aspects orElse
 * @tsplus pipeable Either orElse
 */
export function orElse<E2, B>(onLeft: LazyArg<Either<E2, B>>) {
  return <E, A>(self: Either<E, A>): Either<E2, A | B> => self.catchAll(onLeft)
}
