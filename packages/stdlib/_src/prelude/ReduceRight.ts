/**
 * @tsplus type ReduceRight
 */
export interface ReduceRight<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly ReduceRight: "ReduceRight"
  }
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R, E>(fa: HKT.Kind<F, R, E, A>) => B
}
