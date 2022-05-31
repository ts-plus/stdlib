/**
 * @tsplus type ReduceWithIndex
 */
export interface ReduceWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly ReduceWithIndex: "ReduceWithIndex" }
  readonly reduceWithIndex: ReduceWithIndex.Fn<K, F>
}

export declare namespace ReduceWithIndex {
  export interface Fn<K, F extends HKT> {
    <R, E, A, B>(fa: HKT.Kind<F, R, E, A>, b: B, f: (k: K, b: B, a: A) => B): B
  }
}
