/**
 * @tsplus type Derive
 */
export interface Derive<F extends HKT, G extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Derive: "Derive"
  }
  readonly derive: <R, E, A>(fa: HKT.Kind<G, R, E, A>) => HKT.Kind<G, R, E, HKT.Kind<F, R, E, A>>
}
