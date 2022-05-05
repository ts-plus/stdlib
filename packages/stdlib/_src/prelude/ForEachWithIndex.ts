/**
 * @tsplus type ForEachWithIndex
 */
export type ForEachWithIndex<K, F extends HKT> = {
  readonly Law: {
    readonly ForEachWithIndex: "ForEachWithIndex";
  };
  readonly forEachWithIndexF: ForEachWithIndex.Fn<K, F>;
} & Covariant<F>;

/**
 * @tsplus type ForEachWithIndex/Ops
 */
export interface ForEachWithIndexOps {}
export const ForEachWithIndex: ForEachWithIndexOps = {};

export declare namespace ForEachWithIndex {
  export interface Fn<K, F extends HKT> {
    <G extends HKT>(G_: IdentityBoth<G> & Covariant<G>): <GR, GE, A, B>(
      f: (k: K, a: A) => HKT.Kind<G, GR, GE, B>
    ) => <FR, FE>(
      fa: HKT.Kind<F, FR, FE, A>
    ) => HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>;
  }
}

/**
 * @tsplus static ForEachWithIndex/Ops implementForEachWithIndexF
 */
export function implementForEachWithIndexF<K, F extends HKT>(): (
  i: <R, E, A, B, G extends HKT>(_: {
    A: A;
    B: B;
    G: G;
    R: R;
    E: E;
  }) => (
    G: IdentityBoth<G> & Covariant<G>
  ) => (
    f: (k: K, a: A) => HKT.Kind<G, R, E, B>
  ) => (fa: HKT.Kind<F, R, E, A>) => HKT.Kind<G, R, E, HKT.Kind<F, R, E, B>>
) => ForEachWithIndex.Fn<K, F>;
export function implementForEachWithIndexF() {
  return (i: any) => i();
}
