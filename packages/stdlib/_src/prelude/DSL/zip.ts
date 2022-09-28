/**
 * @tsplus static DSL zipF_
 */
export function zipF_<F extends HKT>(F: Apply<F>) {
  return <R, E, A, R2, E2, B>(
    fa: HKT.Kind<F, R, E, A>,
    fb: HKT.Kind<F, R2, E2, B>
  ): HKT.Kind<F, R & R2, E | E2, readonly [A, B]> => F.both(fb)(fa)
}

/**
 * @tsplus static DSL zipF
 */
export function zipF<F extends HKT>(F: Apply<F>) {
  return <R2, E2, B>(fb: HKT.Kind<F, R2, E2, B>) =>
    <R, E, A>(fa: HKT.Kind<F, R, E, A>): HKT.Kind<F, R & R2, E | E2, readonly [A, B]> =>
      zipF_(F)(fa, fb)
}
