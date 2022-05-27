/**
 * @tsplus type ForEachWithIndex
 */
export interface ForEachWithIndex<K, F extends HKT> extends Covariant<F> {
  readonly Law: Covariant<F>["Law"] & { readonly ForEachWithIndex: "ForEachWithIndex" }
  readonly forEachWithIndex: ForEachWithIndex.Fn<K, F>
}

/**
 * @tsplus type ForEachWithIndex/Ops
 */
export interface ForEachWithIndexOps {}
export const ForEachWithIndex: ForEachWithIndexOps = {}

export declare namespace ForEachWithIndex {
  export interface Fn<K, F extends HKT> {
    <G extends HKT, FR, FE, GR, GE, A, B>(
      fa: HKT.Kind<F, FR, FE, A>,
      f: (k: K, a: A) => HKT.Kind<G, GR, GE, B>,
      /** @tsplus auto */ G: IdentityBoth<G> & Covariant<G>
    ): HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>
  }
}
