/**
 * @tsplus type FilterWithIndex
 */
export interface FilterWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly FilterWithIndex: "FilterWithIndex" }
  readonly filterWithIndex: {
    <R, E, N extends string, K, A, B extends A>(
      fa: HKT.Kind<F, R, E, A>,
      refinement: RefinementWithIndex<K, A, B>
    ): HKT.Kind<F, R, E, B>
    <R, E, K, A>(fa: HKT.Kind<F, R, E, A>, predicate: PredicateWithIndex<K, A>): HKT.Kind<F, R, E, A>
  }
}
