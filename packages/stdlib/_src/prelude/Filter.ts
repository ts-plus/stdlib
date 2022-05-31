/**
 * @tsplus type Filter
 */
export interface Filter<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Filter: "Filter" }
  readonly filter: {
    <R, E, A, B extends A>(fa: HKT.Kind<F, R, E, A>, refinement: Refinement<A, B>): HKT.Kind<F, R, E, B>
    <R, E, A>(fa: HKT.Kind<F, R, E, A>, predicate: Predicate<A>): HKT.Kind<F, R, E, A>
  }
}
