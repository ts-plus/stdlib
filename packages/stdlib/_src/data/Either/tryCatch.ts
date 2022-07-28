/**
 * Constructs a new `Either` from a function that might throw.
 *
 * @tsplus static Either.Ops tryCatch
 */
export function tryCatch<E, A>(
  f: LazyArg<A>,
  onError: (e: unknown) => E
): Either<E, A> {
  try {
    return Either.right(f())
  } catch (e) {
    return Either.left(onError(e))
  }
}
