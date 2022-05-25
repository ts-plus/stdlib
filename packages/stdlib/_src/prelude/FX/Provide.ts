/**
 * @tsplus type Provide
 */
export interface Provide<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Provide: "Provide"
  }
  readonly provide: <R>(r: R) => <X, I, E, A>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, unknown, E, A>
}
