/**
 * @tsplus static DSL orElseF_
 */
export function orElseF_<F extends HKT>(F: Covariant<F> & AssociativeEither<F>) {
  return <R, E, A, R2, E2, B>(
    fa: HKT.Kind<F, R, E, A>,
    fb: LazyArg<HKT.Kind<F, R2, E2, B>>
  ): HKT.Kind<F, R & R2, E | E2, A | B> =>
    F.map((either: Either<A, B>) => either.merge)(F.orElseEither(fb)(fa))
}

/**
 * @tsplus static DSL orElseF
 */
export function orElseF<F extends HKT>(F: Covariant<F> & AssociativeEither<F>) {
  return <R2, E2, B>(fb: LazyArg<HKT.Kind<F, R2, E2, B>>) =>
    <R, E, A>(fa: HKT.Kind<F, R, E, A>): HKT.Kind<F, R & R2, E | E2, A | B> => orElseF_(F)(fa, fb)
}
