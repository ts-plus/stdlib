/**
 * Zip combining errors in case of multiple failures.
 *
 * @tsplus static Either.Ops zipValidation
 */
export function zipValidation<E>(S: Associative<E>) {
  return <A, B>(fa: Either<E, A>, fb: Either<E, B>): Either<E, readonly [A, B]> =>
    fa.fold(
      (ea) =>
        fb.fold(
          (eb) => Either.left(S.combine(ea, eb)),
          () => Either.left(ea)
        ),
      (a) => fb.fold(Either.left, (b) => Either.right([a, b]))
    )
}
