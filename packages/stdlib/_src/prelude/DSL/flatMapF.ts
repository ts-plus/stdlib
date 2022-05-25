/**
 * @tsplus static DSL flatMapF_
 */
export function flatMapF_<F extends HKT>(F: Monad<F>) {
  return <R, E, A, R2, E2, B>(
    fa: HKT.Kind<F, R, E, A>,
    f: (a: A) => HKT.Kind<F, R2, E2, B>
  ): HKT.Kind<F, R & R2, E | E2, B> => F.flatten(F.map(f)(fa))
}

/**
 * @tsplus static DSL flatMapF
 */
export function flatMapF<F extends HKT>(F: Monad<F>) {
  return <R2, E2, A, B>(
    f: (a: A) => HKT.Kind<F, R2, E2, B>
  ) => <R, E>(fa: HKT.Kind<F, R, E, A>): HKT.Kind<F, R2 & R, E2 | E, B> => flatMapF_(F)(fa, f)
}
