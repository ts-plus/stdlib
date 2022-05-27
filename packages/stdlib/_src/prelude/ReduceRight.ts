/**
 * @tsplus type ReduceRight
 */
export interface ReduceRight<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly ReduceRight: "ReduceRight" }
  readonly reduceRight: <R, E, A, B>(fa: HKT.Kind<F, R, E, A>, b: B, f: (a: A, b: B) => B) => B
}
