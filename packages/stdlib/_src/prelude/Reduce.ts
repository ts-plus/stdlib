/**
 * @tsplus type Reduce
 */
export interface Reduce<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Reduce: "Reduce" }
  readonly reduce: <R, E, A, B>(fa: HKT.Kind<F, R, E, A>, b: B, f: (b: B, a: A) => B) => B
}
