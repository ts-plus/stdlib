/**
 * @tsplus type FoldMap
 */
export interface FoldMap<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly FoldMap: "FoldMap";
  };
  readonly foldMap: FoldMap.Fn<F>;
}

export declare namespace FoldMap {
  export interface Fn<F extends HKT> {
    <M>(I: AssociativeIdentity<M>): <A>(f: (a: A) => M) => <R, E>(fa: HKT.Kind<F, R, E, A>) => M;
  }
}
