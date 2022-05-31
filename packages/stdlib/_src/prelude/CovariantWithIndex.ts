/**
 * @tsplus type CovariantWithIndex
 */
export interface CovariantWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly CovariantWithIndex: "CovariantWithIndex" }
  readonly mapWithIndex: <R, E, A, B>(
    fa: HKT.Kind<F, R, E, A>,
    f: (k: K, a: A) => B
  ) => HKT.Kind<F, R, E, B>
}
