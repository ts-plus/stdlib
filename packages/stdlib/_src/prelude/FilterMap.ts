/**
 * @tsplus type FilterMap
 */
export interface FilterMap<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly FilterMap: "FilterMap" }
  readonly filterMap: <R, E, A, B>(fa: HKT.Kind<F, R, E, A>, f: (a: A) => Option<B>) => HKT.Kind<F, R, E, B>
}
