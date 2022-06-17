/**
 * @tsplus type Compact
 */
export interface Compact<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Compact: "Compact"
  }
  readonly compact: <R, E, A>(fa: HKT.Kind<F, R, E, Maybe<A>>) => HKT.Kind<F, R, E, A>
}
