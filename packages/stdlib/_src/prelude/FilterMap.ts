/**
 * @tsplus type FilterMap
 */
export interface FilterMap<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly FilterMap: "FilterMap"
  }
  readonly filterMap: <A, B>(f: (a: A) => Maybe<B>) => <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>
}
