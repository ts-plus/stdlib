/**
 * @tsplus type FilterMapWithIndex
 */
export interface FilterMapWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly FilterMapWithIndex: "FilterMapWithIndex" }
  readonly filterMapWithIndex: <R, E, A, B>(
    fa: HKT.Kind<F, R, E, A>,
    f: (k: K, a: A) => Option<B>
  ) => HKT.Kind<F, R, E, B>
}
