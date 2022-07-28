/**
 * Similar to `flatMap`, but ignores the constructed output.
 *
 * @tsplus static Either.Aspects tap
 * @tsplus pipeable Either tap
 */
export function tap<A, E2, B>(f: (a: A) => Either<E2, B>) {
  return <E>(self: Either<E, A>): Either<E | E2, A> => self.flatMap((a) => f(a).map(() => a))
}
