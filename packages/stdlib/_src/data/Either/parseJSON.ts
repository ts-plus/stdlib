/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @tsplus static Either/Ops parseJSON
 */
export function parseJSON<E>(
  s: string,
  onError: (reason: unknown) => E
): Either<E, unknown> {
  return Either.tryCatch(() => JSON.parse(s), onError)
}
