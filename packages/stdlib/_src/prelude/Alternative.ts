/**
 * @tsplus type Alternative
 */
export type Alternative<F extends HKT> = Covariant<F> & AssociativeEither<F>

/**
 * @tsplus fluent Alternative orElse
 */
export function orElse<F extends HKT, R, E, A, R2, E2, B>(
  F: Covariant<F> & AssociativeEither<F>,
  fa: HKT.Kind<F, R, E, A>,
  fb: LazyArg<HKT.Kind<F, R2, E2, B>>
): HKT.Kind<F, R & R2, E | E2, A | B> {
  return F.map(F.orElseEither(fa, fb), (either) => either.merge())
}
