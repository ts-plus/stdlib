/**
 * @tsplus type Pointed
 */
export type Pointed<F extends HKT> = Covariant<F> & Any<F>

/**
 * @tsplus fluent Pointed succeed
 */
export function succeed<F extends HKT, A>(F: Pointed<F>, a: A): HKT.Kind<F, unknown, never, A> {
  return F.map(F.any, () => a)
}
