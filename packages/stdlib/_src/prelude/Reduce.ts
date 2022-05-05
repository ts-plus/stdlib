/**
 * @tsplus type Reduce
 */
export interface Reduce<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Reduce: "Reduce";
  };
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R, E>(fa: HKT.Kind<F, R, E, A>) => B;
}
