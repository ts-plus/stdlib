/**
 * @tsplus type ReduceWithIndex
 */
export interface ReduceWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly ReduceWithIndex: "ReduceWithIndex";
  };
  readonly reduceWithIndex: ReduceWithIndex.Fn<K, F>;
}

export declare namespace ReduceWithIndex {
  export interface Fn<K, F extends HKT> {
    <A, B>(b: B, f: (k: K, b: B, a: A) => B): <R, E>(fa: HKT.Kind<F, R, E, A>) => B;
  }
}
