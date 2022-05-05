/**
 * @tsplus type FoldMapWithIndex
 */
export interface FoldMapWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    FoldMapWithIndex: "FoldMapWithIndex";
  };
  readonly foldMapWithIndex: FoldMapWithIndex.Fn<K, F>;
}

export declare namespace FoldMapWithIndex {
  export interface Fn<K, F extends HKT> {
    <M>(M: AssociativeIdentity<M>): <A>(f: (k: K, a: A) => M) => <R, E>(fa: HKT.Kind<F, R, E, A>) => M;
  }
}
