/**
 * @tsplus type WitherableWithIndex
 */
export interface WitherableWithIndex<K, F extends HKT> {
  readonly Law: {
    readonly WitherableWithIndex: "WitherableWithIndex";
  };
  readonly compactWithIndexF: WitherWithIndex<K, F>;
}

/**
 * @tsplus type WitherableWithIndex/Ops
 */
export interface WitherableWithIndexOps {}
export const WitherableWithIndex: WitherableWithIndexOps = {};

export interface WitherWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  <G extends HKT>(F: Applicative<G>): <GR, GE, A, B>(
    f: (k: K, a: A) => HKT.Kind<G, GR, GE, Option<B>>
  ) => <FR, FE>(
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>;
}

/**
 * @tsplus static WitherableWithIndex/Ops implementCompactWithIndexF
 */
export function implementCompactWithIndexF<K, F extends HKT>(): (
  i: <FR, FE, A, B, G extends HKT>(_: {
    A: A;
    B: B;
    G: G;
    FR: FR;
    FE: FE;
  }) => (
    G: Applicative<G>
  ) => (
    f: (k: K, a: A) => HKT.Kind<G, FR, FE, Option<B>>
  ) => (ta: HKT.Kind<F, FR, FE, A>) => HKT.Kind<G, FR, FE, HKT.Kind<F, FR, FE, B>>
) => WitherWithIndex<K, F>;
export function implementCompactWithIndexF() {
  return (i: any) => i();
}
