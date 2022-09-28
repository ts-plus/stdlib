/**
 * @tsplus static DSL apF_
 */
export function apF_<F extends HKT>(F: Apply<F>) {
  return <R, E, A, R2, E2, B>(
    fab: HKT.Kind<F, R, E, (a: A) => B>,
    fa: HKT.Kind<F, R2, E2, A>
  ): HKT.Kind<F, R & R2, E | E2, B> =>
    F.map(([a, f]: readonly [A, (a: A) => B]) => f(a))(F.both(fab)(fa))
}

/**
 * @tsplus static DSL apF
 */
export function apF<F extends HKT>(F: Apply<F>) {
  return <R2, E2, A>(fa: HKT.Kind<F, R2, E2, A>) =>
    <R, E, B>(
      fab: HKT.Kind<F, R, E, (a: A) => B>
    ): HKT.Kind<F, R & R2, E | E2, B> => apF_(F)(fab, fa)
}
