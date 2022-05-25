/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @tsplus static Either/Ops stringifyJSON
 */
export function stringifyJSON<E>(
  u: unknown,
  onError: (reason: unknown) => E
): Either<E, string> {
  return Either.tryCatch(() => JSON.stringify(u), onError)
}
