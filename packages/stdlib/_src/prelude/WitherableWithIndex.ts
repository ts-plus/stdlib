/**
 * @tsplus type WitherableWithIndex
 */
export interface WitherableWithIndex<K, F extends HKT> {
  readonly Law: { readonly WitherableWithIndex: "WitherableWithIndex" }
  readonly witherWithIndex: WitherWithIndex<K, F>
}

/**
 * @tsplus type WitherableWithIndex/Ops
 */
export interface WitherableWithIndexOps {}
export const WitherableWithIndex: WitherableWithIndexOps = {}

export interface WitherWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  <G extends HKT, FR, FE, GR, GE, A, B>(
    f: (k: K, a: A) => HKT.Kind<G, GR, GE, Option<B>>,
    ta: HKT.Kind<F, FR, FE, A>,
    F: Applicative<G>
  ): HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>
}
