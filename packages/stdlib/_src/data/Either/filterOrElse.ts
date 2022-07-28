/**
 * Apply the specified predicate to `A` and construct `E` in case that the
 * specified predicate returns `false`.
 *
 * @tsplus static Either.Aspects filterOrElse
 * @tsplus pipeable Either filterOrElse
 */
export function filterOrElse<E, A, B extends A>(
  f: Refinement<A, B>,
  onFalse: (a: A) => E
): <E2>(self: Either<E2, A>) => Either<E | E2, B>
export function filterOrElse<E, A>(
  f: Predicate<A>,
  onFalse: (a: A) => E
): <E2>(self: Either<E2, A>) => Either<E | E2, A>
export function filterOrElse<E, A>(f: Predicate<A>, onFalse: (a: A) => E) {
  return (self: Either<E, A>): Either<E, A> =>
    self.flatMap(
      (a) => (f(a) ? Either.right(a) : Either.left(onFalse(a)))
    )
}
