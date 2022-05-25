/**
 * @tsplus type Compact
 */
export interface Compact<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Compact: "Compact"
  }
  readonly compact: <R, E, A>(fa: HKT.Kind<F, R, E, Option<A>>) => HKT.Kind<F, R, E, A>
}
