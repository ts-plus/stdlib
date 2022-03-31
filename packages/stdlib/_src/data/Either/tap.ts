/**
 * Similar to `flatMap`, but ignores the constructed output.
 *
 * @tsplus fluent Either tap
 */
export function tap_<E, A, E2, B>(
  self: Either<E, A>,
  f: (a: A) => Either<E2, B>
): Either<E | E2, A> {
  return self.flatMap((a) => f(a).map(() => a));
}

/**
 * Similar to `flatMap`, but ignores the constructed output.
 *
 * @tsplus static Either/Aspects tap
 */
export const tap = Pipeable(tap_);
