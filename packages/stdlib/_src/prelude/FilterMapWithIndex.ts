/**
 * @tsplus type FilterMapWithIndex
 */
export interface FilterMapWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly FilterMapWithIndex: "FilterMapWithIndex"
  }
  readonly filterMapWithIndex: <A, B>(
    f: (k: K, a: A) => Option<B>
  ) => <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>
}
