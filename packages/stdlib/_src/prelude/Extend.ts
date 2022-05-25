/**
 * @tsplus type Extend
 */
export interface Extend<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Extend: "Extend"
  }
  readonly extend: <R, E, A, B>(
    f: (fa: HKT.Kind<F, R, E, A>) => B
  ) => (fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>
}
