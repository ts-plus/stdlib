/**
 * @tsplus type CovariantWithIndex
 */
export interface CovariantWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly CovariantWithIndex: "CovariantWithIndex";
  };
  readonly mapWithIndex: <A, B>(
    f: (k: K, a: A) => B
  ) => <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>;
}
