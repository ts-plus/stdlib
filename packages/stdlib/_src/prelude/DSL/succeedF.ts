/**
 * @tsplus static DSL succeedF
 */
export function succeedF<F extends HKT>(F: Covariant<F> & Any<F>) {
  return <A, R = unknown, E = never>(a: A): HKT.Kind<F, R, E, A> => F.map(() => a)(F.any());
}
