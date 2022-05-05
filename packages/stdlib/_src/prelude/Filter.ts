/**
 * @tsplus type Filter
 */
export interface Filter<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Filter: "Filter";
  };
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => HKT.Kind<F, R, E, B>;
    <A>(predicate: Predicate<A>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => HKT.Kind<F, R, E, A>;
  };
}
