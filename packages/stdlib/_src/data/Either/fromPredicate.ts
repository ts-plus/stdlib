/**
 * Construct `Either<E, A>` by applying a predicate to `A` and constructing
 * `E` if the predicate is `false`.
 *
 * @tsplus static Either/Ops fromPredicate
 */
export function fromPredicate<E, A, B extends A>(
  a: A,
  f: Refinement<A, B>,
  onFalse: (a: A) => E
): Either<E, B>;
export function fromPredicate<E, A>(
  a: A,
  f: Predicate<A>,
  onFalse: (a: A) => E
): Either<E, A>;
export function fromPredicate<E, A>(
  a: A,
  f: Predicate<A>,
  onFalse: (a: A) => E
): Either<E, A> {
  return f(a) ? Either.right(a) : Either.left(onFalse(a));
}
