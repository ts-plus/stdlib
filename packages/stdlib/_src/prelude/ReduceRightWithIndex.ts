/**
 * @tsplus type ReduceRightWithIndex
 */
export interface ReduceRightWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    ReduceRightWithIndex: "ReduceRightWithIndex";
  };
  readonly reduceRightWithIndex: ReduceRightWithIndex.Fn<K, F>;
}

export declare namespace ReduceRightWithIndex {
  export interface Fn<K, F extends HKT> {
    <A, B>(b: B, f: (k: K, a: A, b: B) => B): <R, E>(fa: HKT.Kind<F, R, E, A>) => B;
  }
}
