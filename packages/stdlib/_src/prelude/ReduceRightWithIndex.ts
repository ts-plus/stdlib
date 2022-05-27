/**
 * @tsplus type ReduceRightWithIndex
 */
export interface ReduceRightWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { ReduceRightWithIndex: "ReduceRightWithIndex" }
  readonly reduceRightWithIndex: ReduceRightWithIndex.Fn<K, F>
}

export declare namespace ReduceRightWithIndex {
  export interface Fn<K, F extends HKT> {
    <R, E, A, B>(fa: HKT.Kind<F, R, E, A>, b: B, f: (k: K, a: A, b: B) => B): B
  }
}
