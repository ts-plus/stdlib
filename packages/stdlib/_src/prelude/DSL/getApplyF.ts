/**
 * @tsplus static DSL getApplyF
 */
export function getApplyF<F extends HKT>(F: Monad<F>): Apply<F> {
  const flatMap_ = DSL.flatMapF_(F)
  return HKT.instance({
    map: F.map,
    both: <R2, E2, B>(
      fb: HKT.Kind<F, R2, E2, B>
    ) =>
      <R, E, A>(fa: HKT.Kind<F, R, E, A>): HKT.Kind<F, R2 & R, E2 | E, readonly [A, B]> =>
        flatMap_(fb, (b) => F.map((a: A) => [a, b] as const)(fa))
  })
}
