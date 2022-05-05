/**
 * @tsplus type FilterWithIndex
 */
export interface FilterWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly FilterWithIndex: "FilterWithIndex";
  };
  readonly filterWithIndex: {
    <N extends string, K, A, B extends A>(
      refinement: RefinementWithIndex<K, A, B>
    ): <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>;
    <K, A>(predicate: PredicateWithIndex<K, A>): <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, A>;
  };
}
